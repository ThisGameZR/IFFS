import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Prompt } from "models/Completion";
import { ClockLoader } from "react-spinners";
import IdentifyBox from "./analytic/IdentifyBox";
import { TbRefreshAlert } from "react-icons/tb";
import { AiOutlineSmile } from "react-icons/ai";
import { MdOutlineMoodBad } from "react-icons/md";
import { RiChatHeartLine } from "react-icons/ri";
import IdentifyFeedback from "./analytic/IdentifyFeedback";
import { Analyze, Issue } from "models/Project";
ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = ["#8779F7", "#4793FF", "#FF768C", "#FFAD71", "#48DCBF", "#DCDCE5"];

export default function Analytic() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id: projectId } = router.query;
  const { documentId, pageId, toggleAnalytic } = useContainer();
  const { currentUser } = useUser();

  const [analyzes, setAnalyzes] = React.useState<Analyze>();
  const [isAnalyzeLoading, setIsAnalyzeLoading] = React.useState(false);
  React.useEffect(() => {
    if (!currentUser?.id || !projectId || !documentId || !pageId) return;
    setIsAnalyzeLoading(true);
    fetchGetAnalyze(currentUser?.id as string, projectId as string, documentId as string, pageId as string).then(
      (res) => {
        setAnalyzes(res);
        setIsAnalyzeLoading(false);
      }
    );
  }, [pageId, documentId]);

  const problemCounters = analyzes?.issues.map((p) => {
    return {
      type: p.type,
      label: p.label,
      sentiment: p.sentiment,
      text: p.issue,
      suggestion: p.suggestion,
      count: countProblem(p.label, analyzes.issues),
    };
  });

  function countProblem(label: string, issues: Issue[]) {
    let count = 0;
    issues.forEach((p) => {
      if (p.label == label) {
        count++;
      }
    });
    return count;
  }

  let removeDups: unknown[] = [];
  problemCounters?.forEach((p) => {
    const content = JSON.stringify(p);
    if (!removeDups.includes(content)) {
      removeDups.push(content);
    }
  });
  const processedData = removeDups.map((r) => JSON.parse(r as string)).sort((a, b) => b.count - a.count) as {
    type: string;
    sentiment: string;
    label: string;
    text: string;
    suggestion: string;
    count: number;
  }[];
  const problemsAmount = analyzes?.issues.length || 0;
  const labels = processedData.map((p) => {
    return ((p.count / analyzes!.issues.length) * 100).toPrecision(4) + "% " + p.label;
  });
  const others =
    (
      ((problemsAmount - processedData.slice(0, 5).reduce((acc, cur) => (acc += cur.count), 0)) / problemsAmount) *
      100
    ).toPrecision(4) + "% Others";
  const data = {
    labels: others == "0% Others" ? labels.slice(0, 5) : [...labels.slice(0, 5), others],
    datasets: [
      {
        data: [
          ...processedData.slice(0, 5).map((p) => p.count),
          problemsAmount - processedData.slice(0, 5).reduce((acc, cur) => (acc += cur.count), 0),
        ],
        backgroundColor: CHART_COLORS,
        borderColor: CHART_COLORS,
      },
    ],
  };
  function sentimentProblems(processedData: any[], sentiment: string) {
    let count = 0;
    processedData.forEach((p) => {
      if (p.sentiment == sentiment) {
        count += p.count;
      }
    });
    return count;
  }

  if (!toggleAnalytic) return <></>;

  if (isAnalyzeLoading) return <ClockLoader />;
  return (
    <div className="analytic">
      <div className="analytic-chart">
        <Doughnut
          data={data}
          options={{
            animation: true,
            plugins: {
              legend: {
                position: "right",
              },
            },
          }}
        />
      </div>
      <div className="analytic-identify-group">
        <div className="analytic-identify-group-box">
          <IdentifyBox icon={<TbRefreshAlert />} title="ALL IDENTIFY" amount={problemsAmount} className="highlight" />
          <IdentifyBox
            icon={<AiOutlineSmile />}
            title="POSITIVE"
            amount={sentimentProblems(processedData, "Positive")}
            className="color-success"
          />
          <IdentifyBox
            icon={<MdOutlineMoodBad />}
            title="NEGATIVE"
            className="color-delete"
            amount={sentimentProblems(processedData, "Negative")}
          />
          <IdentifyBox
            icon={<RiChatHeartLine />}
            title="SUGGESTION"
            amount={sentimentProblems(processedData, "Neutral")}
            className="emphasize"
          />
        </div>
        <div className="analytic-identify-group-feedback">
          {processedData.map((p, i) => {
            return (
              //@ts-ignore
              <IdentifyFeedback key={i + p.text} type={p.sentiment} text={p.text} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

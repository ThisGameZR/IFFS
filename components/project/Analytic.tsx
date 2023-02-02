import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
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
ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = ["#8779F7", "#4793FF", "#FF768C", "#FFAD71", "#48DCBF", "#DCDCE5"];

export default function Analytic() {
  const router = useRouter();
  const { toggleAnalytic } = useContainer();

  const { id: projectId, document: documentId, page: pageId } = router.query;
  const { currentUser } = useUser();
  const { data: analyzes, isLoading: isAnalyzeLoading } = useQuery(
    "analyzes",
    () => fetchGetAnalyze(currentUser?.id as string, projectId as string, documentId as string, pageId as string),
    {
      enabled: !!currentUser,
      refetchOnWindowFocus: false,
    }
  );

  const problemCounters = analyzes?.text.problems.map((p) => {
    return {
      type: p.type,
      label: p.label,
      sentiment: p.sentiment,
      text: p.text,
      suggestion: p.suggestion,
      count: countProblem(p.label, analyzes.text),
    };
  });

  function countProblem(label: string, prompt: Prompt) {
    let count = 0;
    prompt.problems.forEach((p) => {
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
  const problemsAmount = analyzes?.text.problems.length || 0;
  const labels = processedData.map((p) => {
    return ((p.count / analyzes!.text.problems.length) * 100).toPrecision(4) + "% " + p.label;
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
          {processedData.map((p) => {
            return (
              //@ts-ignore
              <IdentifyFeedback type={p.sentiment} text={p.text} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

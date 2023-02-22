import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { useRouter } from "next/router";
import React from "react";
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
    labels: others == "0.000% Others" ? labels.slice(0, 5) : [...labels.slice(0, 5), others],
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

  const UXPositive =
    (
      (processedData.filter((p) => p.type === "UX").filter((p) => p.sentiment === "Positive").length /
        processedData.filter((p) => p.type === "UX").length) *
      100
    ).toFixed(2) + "%";

  const UXNegative =
    (
      (processedData.filter((p) => p.type === "UX").filter((p) => p.sentiment === "Negative").length /
        processedData.filter((p) => p.type === "UX").length) *
      100
    ).toFixed(2) + "%";

  const UIPositive =
    (
      (processedData.filter((p) => p.type === "UI").filter((p) => p.sentiment === "Positive").length /
        processedData.filter((p) => p.type === "UI").length) *
      100
    ).toFixed(2) + "%";

  const UINegative =
    (
      (processedData.filter((p) => p.type === "UI").filter((p) => p.sentiment === "Negative").length /
        processedData.filter((p) => p.type === "UI").length) *
      100
    ).toFixed(2) + "%";

  if (!toggleAnalytic) return <></>;

  if (!documentId && !pageId)
    return (
      <h1
        style={{
          padding: "4rem 4rem",
          fontSize: "1.3rem",
        }}
      >
        Select the page first
      </h1>
    );

  if (isAnalyzeLoading) return <ClockLoader />;
  return (
    <div className="analytic">
      <div className="analytic-header">
        <div className="analytic-header-chart">
          <h3>Popular Feedback</h3>
          <Doughnut
            data={data}
            options={{
              animation: true,
              plugins: {
                title: {
                  display: true,
                  position: "top",
                  text: "Popular Feedback",
                },
                legend: {
                  position: "right",
                  labels: {
                    boxWidth: 15,
                    boxHeight: 15,
                  },
                },
              },
            }}
          />
        </div>
        <div className="analytic-header-feedback">
          <h3>UX/UI Feedback Ratio</h3>
          <div>
            <h4>UX</h4>
            <div className="bar">
              <div
                style={{
                  width: UXPositive,
                }}
                className="positive"
              ></div>
              <div
                style={{
                  width: UXNegative,
                }}
                className="negative"
              ></div>
            </div>
          </div>
          <div>
            <h4>UI</h4>
            <div className="bar">
              <div
                style={{
                  width: UIPositive,
                }}
                className="positive"
              ></div>
              <div
                style={{
                  width: UINegative,
                }}
                className="negative"
              ></div>
            </div>
          </div>
          <div className="legend">
            <div className="positive row">
              <div className="badge Positive">Positive</div>
              <div className="col">
                <div className="type UX">UX</div>
                <span>{UXPositive}</span>
              </div>
              <div className="col">
                <div className="type UI">UI</div>
                <span>{UIPositive}</span>
              </div>
            </div>
            <div className="negative row">
              <div className="badge Negative">Negative</div>
              <div className="col">
                <div className="type UX">UX</div>
                <span>{UXNegative}</span>
              </div>
              <div className="col">
                <div className="type UI">UI</div>
                <span>{UINegative}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="analytic-identify-group">
        <div className="analytic-identify-group-box">
          <IdentifyBox icon={<TbRefreshAlert />} title="ALL IDENTIFY" amount={problemsAmount} className="highlight" />
          <IdentifyBox
            icon={<AiOutlineSmile />}
            title="POSITIVE"
            amount={sentimentProblems(processedData, "Positive")}
          />
          <IdentifyBox
            icon={<MdOutlineMoodBad />}
            title="NEGATIVE"
            amount={sentimentProblems(processedData, "Negative")}
          />
        </div>
        <div className="analytic-identify-group-feedback">
          {processedData.map((p, i) => {
            return (
              //@ts-ignore
              <IdentifyFeedback key={i + p.text} type={p.type} sentiment={p.sentiment} text={p.text} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

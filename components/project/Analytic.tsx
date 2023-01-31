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
      label: p.label,
      count: countProblem(p.label, analyzes.text),
    };
  });
  let removeDups: unknown[] = [];
  problemCounters?.forEach((p) => {
    const content = JSON.stringify(p);
    if (!removeDups.includes(content)) {
      removeDups.push(content);
    }
  });
  const processedData = removeDups.map((r) => JSON.parse(r as string)).sort((a, b) => b.count - a.count) as {
    label: string;
    count: number;
  }[];
  const problemsAmount = analyzes?.text.problems.length || 0;
  const labels = processedData.map((p) => {
    return (p.count / analyzes!.text.problems.length) * 100 + "% " + p.label;
  });
  const others =
    ((problemsAmount - processedData.slice(0, 5).reduce((acc, cur) => (acc += cur.count), 0)) / problemsAmount) * 100 +
    "% Others";
  const data = {
    labels: others == "0% Others" ? labels : [...labels, others],
    datasets: [
      {
        data: processedData.map((p) => p.count),
        backgroundColor: CHART_COLORS,
        borderColor: CHART_COLORS,
      },
    ],
  };

  function countProblem(label: string, prompt: Prompt) {
    let count = 0;
    prompt.problems.forEach((p) => {
      if (p.label == label) {
        count++;
      }
    });
    return count;
  }

  function top4Problems() {}

  if (!toggleAnalytic) return <></>;
  if (isAnalyzeLoading) return <ClockLoader />;
  return (
    <div className="analytic">
      <div className="analytic-chart">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

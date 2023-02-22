import SuggestionCard from "components/project/SuggestionCard";
import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { Analyze } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function RightBar() {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { documentId, pageId } = useContainer();
  const { currentUser } = useUser();
  const [analyze, setAnalyze] = React.useState<Analyze>();
  const [isAnalyzeLoading, setIsAnalyzeLoading] = React.useState(false);
  React.useEffect(() => {
    if (!currentUser?.id || !projectId || !documentId || !pageId) return;
    setIsAnalyzeLoading(true);
    fetchGetAnalyze(currentUser?.id as string, projectId as string, documentId as string, pageId as string).then(
      (res) => {
        setAnalyze(res);
        setIsAnalyzeLoading(false);
      }
    );
  }, [pageId, documentId]);

  return (
    <div className="project__layout">
      <div className="rightbar">
        {analyze?.issues.map((issue) => {
          return (
            <SuggestionCard
              issue={issue.issue}
              suggestion={issue.suggestion}
              sentiment={issue.sentiment}
              type={issue.type}
            />
          );
        })}
      </div>
    </div>
  );
}

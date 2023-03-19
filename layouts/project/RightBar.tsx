import SuggestionCard from "components/project/SuggestionCard";
import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { Analyze } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import { ClockLoader } from "react-spinners";

export default function RightBar() {
  const router = useRouter();
  const { id: projectId } = router.query;
  const { documentId, pageId, forceUpdate } = useContainer();
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
  }, [pageId, documentId, forceUpdate]);

  return (
    <div className="project__layout">
      <div className="rightbar">
        {!isAnalyzeLoading ? (
          analyze?.issues.map((issue, i) => {
            return (
              <SuggestionCard
                key={issue.issue + i}
                issue={issue.issue}
                suggestion={issue.suggestion || "Nothing"}
                sentiment={issue.sentiment}
                type={issue.type}
              />
            );
          })
        ) : (
          <ClockLoader></ClockLoader>
        )}
      </div>
    </div>
  );
}

import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchGetAnalyze } from "fetch/analyze";
import { fetchUpdatePage } from "fetch/page";
import { fetchGetProjects } from "fetch/project";
import { Project } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineAnalytics } from "react-icons/md";
import { useQuery } from "react-query";
import { ClockLoader } from "react-spinners";
export default function Document() {
  const { toggleDocument } = useContainer();
  const [text, setText] = React.useState("");
  const router = useRouter();
  const { id, document, page } = router.query;
  const { currentUser } = useUser();
  const { data: projects } = useQuery("projects", () => fetchGetProjects(currentUser?.id!), {
    enabled: !!currentUser,
  });
  const project = projects?.find((project) => project.id === id);
  const currentDocument = project?.documents?.find((doc) => doc.id === document);
  const currentPage = currentDocument?.pages?.find((p) => p.id === page);
  React.useEffect(() => {
    if (currentPage) {
      setText(currentPage.content as string);
    }
  }, [currentPage]);

  const [loading, setLoading] = React.useState(false);

  const handleSaveAndAnalyze = async () => {
    const userId = currentUser?.id as string;
    const projectId = id as string;
    const documentId = document as string;
    const pageId = page as string;
    await fetchUpdatePage(userId, projectId, documentId, pageId, undefined, text);
    setLoading(true);
    await fetchGetAnalyze(text, userId, projectId, documentId, pageId);
    setLoading(false);
  };

  if (!toggleDocument) return <></>;

  return (
    <>
      <div
        className="save-and-analyze"
        onClick={async () => {
          await handleSaveAndAnalyze();
        }}
      >
        {!loading ? <MdOutlineAnalytics /> : <ClockLoader size={10} />}
        Save & Analyze
      </div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </>
  );
}

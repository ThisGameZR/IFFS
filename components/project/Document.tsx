import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchPostAnalyze } from "fetch/analyze";
import { fetchUpdatePage } from "fetch/page";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineAnalytics } from "react-icons/md";
import { ClockLoader } from "react-spinners";
export default function Document() {
  const { toggleDocument, documentId, pageId } = useContainer();

  const [text, setText] = React.useState("");
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useUser();
  const { project } = useContainer();
  const currentDocument = project?.documents?.find((doc) => doc.id === documentId);
  const currentPage = currentDocument?.pages?.find((p) => p.id === pageId);
  React.useEffect(() => {
    if (currentPage) {
      setText(currentPage.content as string);
    }
  }, [currentPage]);

  const [loading, setLoading] = React.useState(false);

  const handleSaveAndAnalyze = async () => {
    const userId = currentUser?.id as string;
    const projectId = id as string;
    await fetchUpdatePage(userId, projectId, documentId, pageId, undefined, text);
    setLoading(true);
    await fetchPostAnalyze(text, userId, projectId, documentId, pageId);
    setLoading(false);
  };

  const disable = !(!!id && !!documentId && !!pageId);

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
        maxLength={2000}
        disabled={disable}
        value={disable ? "Select the page first" : text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </>
  );
}

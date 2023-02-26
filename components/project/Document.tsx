import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchPostAnalyze } from "fetch/analyze";
import { fetchUpdatePage } from "fetch/page";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import { MdOutlineAnalytics } from "react-icons/md";
import { BarLoader, ClockLoader } from "react-spinners";
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
    try {
      toast.promise(fetchPostAnalyze(text, userId, projectId, documentId, pageId), {
        loading: "Analyzing your data...",
        success: () => {
          setLoading(false);
          return "Successfully analyzing your data";
        },
        error: () => {
          setLoading(false);
          return "Something went wrong with the AI";
        },
      });
    } catch (e: any) {
      toast.error("Something went wrong with the AI");
      setLoading(false);
    }
  };

  const disable = !(!!id && !!documentId && !!pageId);

  if (!toggleDocument) return <></>;

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <BarLoader />
        </div>
      )}
      <div
        className="save-and-analyze"
        onClick={async () => {
          if (!documentId && !pageId) return;
          if (loading) return;
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

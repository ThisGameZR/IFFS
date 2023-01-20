import { useContainer } from "context/ContainerProvider";
import { useUser } from "context/UserProvider";
import { fetchUpdateProject } from "fetch/project";
import { Project } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineAnalytics } from "react-icons/md";
export default function Document() {
  const { toggleDocument } = useContainer();
  const [text, setText] = React.useState("");
  const router = useRouter();
  const { id, document, page } = router.query;
  const { currentUser } = useUser();
  if (!toggleDocument) return <></>;
  return (
    <>
      <div
        className="save-and-analyze"
        onClick={() => {
          fetchUpdateProject(currentUser?.id as string, id as string, document as string, page as string, text);
        }}
      >
        <MdOutlineAnalytics />
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

import ProjectDocument from "components/project/ProjectDocument";
import React from "react";
import { Project, Page, Document } from "models/Project";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "components/Modal";
import { fetchCreateDocument } from "fetch/document";
import { useUser } from "context/UserProvider";
import { useQueryClient } from "react-query";
import { useContainer } from "context/ContainerProvider";
import { useRouter } from "next/router";
export default function Leftbar({ project }: { project: Project }) {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { setDocumentId, setProject } = useContainer();

  const [activeDocument, setActiveDocument] = React.useState(project?.documents?.[0]?.id);
  const [modal, setModal] = React.useState(false);
  const [input, setInput] = React.useState("");
  const { currentUser } = useUser();
  const newDocumentHandler = () => {
    fetchCreateDocument(currentUser?.id as string, project.id as string, {
      name: input,
      description: "",
    }).then(() => {
      setModal(false);
      setInput("");
      queryClient.invalidateQueries("projects");
    });
  };
  return (
    <>
      <div className="project__layout">
        <div className="leftbar">
          <div className="add-project">
            Project Document/Page <AiOutlinePlus onClick={() => setModal(true)} />
          </div>
          {project?.documents?.map((document) => (
            <ProjectDocument
              key={document.id}
              document={document}
              setActiveDocument={() => {
                setActiveDocument(document.id);
                setDocumentId(document.id!);
                setProject(project);
              }}
              activeDocument={activeDocument}
            />
          ))}
        </div>
      </div>
      <Modal open={modal} setOpen={setModal} title="New Document" apply={() => newDocumentHandler()}>
        <input
          type="text"
          autoFocus={modal}
          placeholder="Press enter to create document"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              newDocumentHandler();
            }
          }}
        />
      </Modal>
    </>
  );
}

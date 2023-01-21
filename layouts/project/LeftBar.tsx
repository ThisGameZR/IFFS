import ProjectDocument from "components/project/ProjectDocument";
import React from "react";
import { Project, Page, Document } from "models/Project";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "components/Modal";
import { fetchCreateDocument } from "fetch/document";
import { useUser } from "context/UserProvider";
export default function Leftbar({ project }: { project: Project }) {
  const [activeDocument, setActiveDocument] = React.useState(project?.documents?.[0].id);
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
              setActiveDocument={() => setActiveDocument(document.id)}
              activeDocument={activeDocument}
            />
          ))}
        </div>
      </div>
      <Modal open={modal} setOpen={setModal} title="New Document">
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

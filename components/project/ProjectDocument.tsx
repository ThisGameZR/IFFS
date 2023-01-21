import { Document, Project } from "models/Project";
import React from "react";
import { FaFolderMinus, FaFolderOpen } from "react-icons/fa";
import ProjectPage from "./ProjectPage";
import { useRouter } from "next/router";
import SimpleMenu from "components/SimpleMenu";
import Modal from "components/Modal";
import { fetchUpdateDocumentName } from "fetch/document";
import { useUser } from "context/UserProvider";
import { useQueryClient } from "react-query";

export default function ProjectDocument({
  document,
  setActiveDocument,
  activeDocument,
}: {
  document: Document;
  setActiveDocument: () => void;
  activeDocument: string | undefined;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activePage, setActivePage] = React.useState(document?.pages?.[0]?.id);
  const [display, setDisplay] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editInput, setEditInput] = React.useState(document?.name);
  const { id: projectId, document: documentId, page: pageId } = router.query;
  const { currentUser } = useUser();
  const editDocumentNameHandler = () => {
    fetchUpdateDocumentName(
      currentUser?.id as string,
      projectId as string,
      document.id as string,
      editInput as string
    ).then((res) => {
      setOpenEdit(false);
      queryClient.invalidateQueries("projects");
    });
  };

  return (
    <>
      <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Document Name">
        <input
          type="text"
          autoFocus={openEdit}
          placeholder="Press enter to rename document"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editDocumentNameHandler();
            }
          }}
        />
      </Modal>
      <div className="project-document">
        <div className="project-document-wrap">
          <div className="document-toggle" onClick={() => setDisplay(!display)}>
            {display ? <FaFolderOpen /> : <FaFolderMinus />}
            <h1>{document?.name}</h1>
          </div>
          <SimpleMenu
            onEdit={() => setOpenEdit(true)}
            onAdd={() => console.log("add")}
            onDelete={() => console.log("delete")}
          />
        </div>
        {display ? (
          <div className="project-page-wrap">
            {document?.pages?.map((page) => {
              return (
                <ProjectPage
                  key={page.id}
                  page={page}
                  onClick={() => {
                    setActiveDocument();
                    setActivePage(page.id);
                    // get current route
                    const currentRoute = router.pathname;
                    // get current query
                    const currentQuery = router.query;
                    // append query with document id and page id
                    const newQuery = { ...currentQuery, document: document.id, page: page.id };
                    // push new route
                    router.push({ pathname: currentRoute, query: newQuery });
                  }}
                  active={activePage === page.id && activeDocument === document.id}
                />
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

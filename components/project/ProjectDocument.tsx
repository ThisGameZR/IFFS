import { Document, Project } from "models/Project";
import React from "react";
import { FaFolderMinus, FaFolderOpen } from "react-icons/fa";
import ProjectPage from "./ProjectPage";
import { useRouter } from "next/router";
import SimpleMenu from "components/SimpleMenu";
import Modal from "components/Modal";
import { fetchDeleteDocument, fetchUpdateDocumentName } from "fetch/document";
import { useUser } from "context/UserProvider";
import { useQueryClient } from "react-query";
import { fetchCreatePage } from "fetch/page";
import { useContainer } from "context/ContainerProvider";

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

  const { setPageId } = useContainer();
  const { id: projectId } = router.query;
  const { currentUser } = useUser();

  const [activePage, setActivePage] = React.useState(document?.pages?.[0]?.id);
  const [display, setDisplay] = React.useState(true);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editInput, setEditInput] = React.useState(document?.name);
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

  const [openAdd, setOpenAdd] = React.useState(false);
  const [addInput, setAddInput] = React.useState("");
  const addPageHandler = () => {
    fetchCreatePage(currentUser?.id as string, projectId as string, document.id as string, {
      name: addInput,
      description: "",
      content: "",
    }).then((res) => {
      setOpenAdd(false);
      queryClient.invalidateQueries("projects");
    });
  };

  const [displayMenu, setDisplayMenu] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteDocumentHandler = () => {
    fetchDeleteDocument(currentUser?.id as string, projectId as string, document.id as string).then((res) => {
      setOpenDelete(false);
      queryClient.invalidateQueries("projects");
    });
  };

  return (
    <>
      <div className="project-document">
        <div
          className="project-document-wrap"
          onMouseOver={() => setDisplayMenu(true)}
          onMouseLeave={() => setDisplayMenu(false)}
        >
          <div className="document-toggle" onClick={() => setDisplay(!display)}>
            {display ? <FaFolderOpen /> : <FaFolderMinus />}
            <h1>{document?.name}</h1>
          </div>
          <SimpleMenu
            onEdit={() => setOpenEdit(true)}
            onAdd={() => setOpenAdd(true)}
            onDelete={() => setOpenDelete(true)}
            display={displayMenu}
          />
        </div>
        {display ? (
          <div className="project-page-wrap">
            {document?.pages?.map((page) => {
              return (
                <ProjectPage
                  key={page.id}
                  page={page}
                  documentId={document.id!}
                  pageId={page.id!}
                  onClick={() => {
                    setActiveDocument();
                    setActivePage(page.id);
                    setPageId(page.id!);
                    // const currentRoute = router.pathname;
                    // const currentQuery = router.query;
                    // const newQuery = { ...currentQuery, document: document.id, page: page.id };
                    // router.push({ pathname: currentRoute, query: newQuery });
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
      <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Document Name" apply={() => editDocumentNameHandler()}>
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
      <Modal open={openAdd} setOpen={setOpenAdd} title="New Page" apply={() => addPageHandler()}>
        <input
          type="text"
          autoFocus={openAdd}
          placeholder="Press enter to create new page"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addPageHandler();
            }
          }}
        />
      </Modal>
      <Modal open={openDelete} setOpen={setOpenDelete} title="All pages will be gone?">
        <div className="modal-delete">
          <button className="btn btn-secondary" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => deleteDocumentHandler()}>
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

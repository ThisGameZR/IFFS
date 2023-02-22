import Modal from "components/Modal";
import SimpleMenu from "components/SimpleMenu";
import { useUser } from "context/UserProvider";
import { fetchDeletePage, fetchUpdatePage } from "fetch/page";
import { Page } from "models/Project";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { useQueryClient } from "react-query";

export default function ProjectPage({
  page,
  onClick,
  active,
  documentId,
  pageId,
}: {
  page: Page;
  onClick: () => void;
  active: boolean;
  documentId: string;
  pageId: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id: projectId } = router.query;
  const { currentUser } = useUser();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editInput, setEditInput] = React.useState(page?.name);
  const editPageHandler = () => {
    fetchUpdatePage(currentUser?.id as string, projectId as string, documentId, pageId, editInput).then(() => {
      queryClient.invalidateQueries("projects");
      setOpenEdit(false);
    });
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const deletePageHandler = () => {
    fetchDeletePage(currentUser?.id as string, projectId as string, documentId as string, pageId as string).then(() => {
      queryClient.invalidateQueries("projects");
      setOpenDelete(false);
    });
  };
  return (
    <>
      <div className={(active ? "active" : "") + " project-page"}>
        <div className="page-name" onClick={() => onClick()}>
          <AiOutlineFileText /> {page.name}
        </div>
        <SimpleMenu onEdit={() => setOpenEdit(true)} onDelete={() => setOpenDelete(true)} />
      </div>
      <Modal open={openEdit} setOpen={setOpenEdit} title="Edit Document Name">
        <input
          type="text"
          autoFocus={openEdit}
          placeholder="Press enter to rename document"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editPageHandler();
            }
          }}
        />
      </Modal>
      <Modal open={openDelete} setOpen={setOpenDelete} title="All pages will be gone?">
        <div className="modal-delete">
          <button className="btn btn-danger" onClick={() => deletePageHandler()}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

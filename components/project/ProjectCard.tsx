import { Project } from "models/Project";
import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { useRouter } from "next/router";
import SimpleMenu from "components/SimpleMenu";
import Modal from "components/Modal";
import { fetchDeleteProject, fetchUpdateProjectName } from "fetch/project";
import { useUser } from "context/UserProvider";
import { useQueryClient } from "react-query";

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const routerAppend = (project: Project) => {
    router.push(
      "/project/" +
        project.id +
        "?document=" +
        project.documents?.[0]?.id +
        "&page=" +
        project.documents?.[0]?.pages?.[0]?.id
    );
  };

  const { currentUser } = useUser();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editInput, setEditInput] = React.useState(project?.name);
  const editProjectHandler = () => {
    fetchUpdateProjectName(currentUser?.id!, project.id!, editInput!).then(() => {
      setOpenEdit(false);
      queryClient.invalidateQueries("projects");
    });
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteProjectHandler = () => {
    fetchDeleteProject(currentUser?.id!, project.id!).then(() => {
      setOpenDelete(false);
      queryClient.invalidateQueries("projects");
    });
  };

  return (
    <>
      <Modal open={openDelete} setOpen={setOpenDelete} title="All pages will be gone?">
        <div className="modal-delete">
          <button className="btn btn-danger" onClick={() => deleteProjectHandler()}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
        </div>
      </Modal>
      <Modal open={openEdit} setOpen={() => setOpenEdit(false)} title="Rename project">
        <input
          type="text"
          autoFocus={openEdit}
          placeholder="Press enter to rename document"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editProjectHandler();
            }
          }}
        />
      </Modal>
      <div className="project-card">
        <div className="project-image" onClick={() => routerAppend(project)}>
          <GrDocumentText />
        </div>
        <div className="project-info">
          <h1 onClick={() => routerAppend(project)}>{project.name}</h1>
          <SimpleMenu onEdit={() => setOpenEdit(true)} onDelete={() => setOpenDelete(true)} />
        </div>
      </div>
    </>
  );
}

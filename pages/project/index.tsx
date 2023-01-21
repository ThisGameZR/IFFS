import React from "react";
import { useRouter } from "next/router";
import { IoMdAddCircle } from "react-icons/io";
import ProjectCard from "components/project/ProjectCard";
import Head from "next/head";
import { useQuery, useQueryClient } from "react-query";
import { fetchCreateProject, fetchGetProjects } from "fetch/project";
import { useUser } from "context/UserProvider";
import { PacmanLoader } from "react-spinners";
export default function landing() {
  const router = useRouter();
  const { currentUser } = useUser();

  const { data: projects, isLoading: isProjectsLoading } = useQuery(
    "projects",
    () => fetchGetProjects(currentUser?.id!),
    {
      enabled: !!currentUser,
    }
  );
  const queryClient = useQueryClient();

  const [input, setInput] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleNewProject = async () => {
    await fetchCreateProject(currentUser?.id!, {
      name: input,
      description: "",
    });
    queryClient.invalidateQueries("projects");
    setInput("");
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>IFFS - Projects</title>
      </Head>
      <div className="project">
        <nav className="project__navbar">
          <h1 onClick={() => router.push("/")}>IFFS</h1>
          <h4>Your projects</h4>
          <h5></h5>
        </nav>
        <div className="project__layout">
          <div className="project-upload">
            <h1>Project</h1>
            <button onClick={() => setOpen(true)}>
              <IoMdAddCircle /> New Project
            </button>
          </div>
          <div className="project-list">
            {!isProjectsLoading ? (
              projects?.map((project) => {
                return <ProjectCard key={project.id} project={project} />;
              })
            ) : (
              <PacmanLoader color="#4793ff" title="Loading..." size={50} />
            )}
          </div>
        </div>
      </div>
      <Modal title="Enter new project name" open={open} setOpen={setOpen}>
        <input
          type="text"
          autoFocus={open}
          placeholder="Press enter to create project"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNewProject();
            }
          }}
        />
      </Modal>
    </>
  );
}

import { getSession } from "next-auth/react";
import Modal from "components/Modal";
import useOnClickOutside from "hooks/useOnClickOutside";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

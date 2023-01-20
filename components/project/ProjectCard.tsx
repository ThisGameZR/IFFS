import { Project } from "models/Project";
import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { useRouter } from "next/router";

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const routerAppend = (project: Project) => {
    router.push(
      "/project/" +
        project.id +
        "?document=" +
        project.documents?.[0].id +
        "&page=" +
        project.documents?.[0].pages?.[0].id
    );
  };

  return (
    <div className="project-card" onClick={() => routerAppend(project)}>
      <div className="project-image">
        <GrDocumentText />
      </div>
      <div className="project-info">
        <h1>{project.name}</h1>
        {/* <h4>Project Description</h4> */}
      </div>
    </div>
  );
}

import React from "react";
import Container from "./Container";
import Header from "./Header";
import Leftbar from "./LeftBar";
import RightBar from "./RightBar";
import { Project } from "models/Project";

export default function Layout({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <div className="project">
      <div className="project__layout">
        <Header title={project?.name!} />
        <div className="project__layout-wrap">
          <Leftbar project={project} />
          <Container>{children}</Container>
          <RightBar />
        </div>
      </div>
    </div>
  );
}

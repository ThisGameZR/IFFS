import ProjectDocument from "components/project/ProjectDocument";
import React from "react";
import { Project, Page } from "models/Project";

export default function Leftbar({ project }: { project: Project }) {
  const [activeDocument, setActiveDocument] = React.useState(project?.documents?.[0].id);

  return (
    <div className="project__layout">
      <div className="leftbar">
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
  );
}

import { Page } from "models/Project";
import React from "react";
import { AiOutlineFileText } from "react-icons/ai";

export default function ProjectPage({ page, onClick, active }: { page: Page; onClick: () => void; active: boolean }) {
  return (
    <div className={(active ? "active" : "") + " project-page"} onClick={onClick}>
      <AiOutlineFileText /> {page.name}
    </div>
  );
}

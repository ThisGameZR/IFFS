import { Document, Project } from "models/Project";
import React from "react";
import { FaFolderMinus, FaFolderOpen } from "react-icons/fa";
import ProjectPage from "./ProjectPage";
import { useRouter } from "next/router";
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
  const [activePage, setActivePage] = React.useState(document?.pages?.[0].id);
  const [display, setDisplay] = React.useState(true);
  return (
    <div className="project-document">
      <div className="project-document-wrap" onClick={() => setDisplay(!display)}>
        {display ? <FaFolderOpen /> : <FaFolderMinus />}
        <h1>{document?.name}</h1>
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
  );
}

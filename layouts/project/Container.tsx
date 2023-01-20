import { useContainer } from "context/ContainerProvider";
import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  const { toggleDocument, setToggleDocument, toggleAnalytic, setToggleAnalytic } = useContainer();

  return (
    <div className="project__layout__container">
      <div className="bar">
        <button
          className={toggleDocument ? "active" : ""}
          onClick={() => {
            setToggleDocument(!toggleDocument);
            setToggleAnalytic(false);
          }}
        >
          Document
        </button>
        <button
          className={toggleAnalytic ? "active" : ""}
          onClick={() => {
            setToggleAnalytic(!toggleAnalytic);
            setToggleDocument(false);
          }}
        >
          Analytic
        </button>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

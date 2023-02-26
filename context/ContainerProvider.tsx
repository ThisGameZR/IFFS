import { Project } from "models/Project";
import React from "react";

const ContainerContext = React.createContext<{
  toggleDocument: boolean;
  setToggleDocument: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAnalytic: boolean;
  setToggleAnalytic: React.Dispatch<React.SetStateAction<boolean>>;
  documentId: string;
  setDocumentId: React.Dispatch<React.SetStateAction<string>>;
  pageId: string;
  setPageId: React.Dispatch<React.SetStateAction<string>>;
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setForceUpdate: React.Dispatch<React.SetStateAction<number>>;
  forceUpdate: number;
}>({
  toggleDocument: false,
  setToggleDocument: () => {},
  toggleAnalytic: false,
  setToggleAnalytic: () => {},
  documentId: "",
  setDocumentId: () => {},
  pageId: "",
  setPageId: () => {},
  project: null,
  setProject: () => {},
  setForceUpdate: () => {},
  forceUpdate: 0,
});

export const useContainer = () => React.useContext(ContainerContext);

const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleDocument, setToggleDocument] = React.useState(true);
  const [toggleAnalytic, setToggleAnalytic] = React.useState(false);
  const [documentId, setDocumentId] = React.useState("");
  const [pageId, setPageId] = React.useState("");
  const [project, setProject] = React.useState<Project | null>(null);
  const [forceUpdate, setForceUpdate] = React.useState(0);
  const value = React.useMemo(() => {
    return {
      toggleDocument,
      setToggleDocument,
      toggleAnalytic,
      setToggleAnalytic,
      documentId,
      setDocumentId,
      pageId,
      setPageId,
      project,
      setProject,
      forceUpdate,
      setForceUpdate,
    };
  }, [
    toggleDocument,
    setToggleDocument,
    toggleAnalytic,
    setToggleAnalytic,
    documentId,
    setDocumentId,
    pageId,
    setPageId,
    project,
    setProject,
    forceUpdate,
    setForceUpdate,
  ]);
  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
};

export default ContainerProvider;

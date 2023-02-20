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
}>({
  toggleDocument: false,
  setToggleDocument: () => {},
  toggleAnalytic: false,
  setToggleAnalytic: () => {},
  documentId: "",
  setDocumentId: () => {},
  pageId: "",
  setPageId: () => {},
});

export const useContainer = () => React.useContext(ContainerContext);

const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleDocument, setToggleDocument] = React.useState(true);
  const [toggleAnalytic, setToggleAnalytic] = React.useState(false);
  const [documentId, setDocumentId] = React.useState("");
  const [pageId, setPageId] = React.useState("");
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
  ]);
  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
};

export default ContainerProvider;

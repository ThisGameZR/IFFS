import React from "react";

const ContainerContext = React.createContext<{
  toggleDocument: boolean;
  setToggleDocument: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAnalytic: boolean;
  setToggleAnalytic: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  toggleDocument: false,
  setToggleDocument: () => {},
  toggleAnalytic: false,
  setToggleAnalytic: () => {},
});

export const useContainer = () => React.useContext(ContainerContext);

const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleDocument, setToggleDocument] = React.useState(true);
  const [toggleAnalytic, setToggleAnalytic] = React.useState(false);
  const value = React.useMemo(() => {
    return { toggleDocument, setToggleDocument, toggleAnalytic, setToggleAnalytic };
  }, [toggleDocument, setToggleDocument, toggleAnalytic, setToggleAnalytic]);
  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
};

export default ContainerProvider;

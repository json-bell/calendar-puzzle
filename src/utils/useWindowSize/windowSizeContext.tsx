import { createContext, ReactNode, useContext } from "react";
import { WindowSize } from "./types";
import useWindowSize from "./useWindowSize";

export const ViewportContext = createContext<WindowSize>("large");

export const useViewport = () => useContext(ViewportContext);

export const ViewportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const viewport = useWindowSize();

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
};

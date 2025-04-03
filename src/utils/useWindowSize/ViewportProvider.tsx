import { ReactNode } from "react";
import useWindowSize from "./useWindowSize";
import { ViewportContext } from "./windowSizeContext";

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

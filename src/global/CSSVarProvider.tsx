import { ReactNode } from "react";
import { globalCSSVariables } from "./globalVariables";
import { useViewport } from "../utils/useWindowSize/windowSizeContext";

const CSSVarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const viewport = useViewport();

  return (
    <div
      data-testid="global-variable-provider"
      style={globalCSSVariables({ sizeKey: viewport })}
    >
      {children}
    </div>
  );
};

export default CSSVarProvider;

import { ReactNode } from "react";
import { globalCSSVariables } from "./globalVariables";

const CSSVarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div style={globalCSSVariables}>{children}</div>;
};

export default CSSVarProvider;

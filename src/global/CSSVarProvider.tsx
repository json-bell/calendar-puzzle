import { ReactNode } from "react";
import { globalCSSVariables } from "./globalVariables";

const CSSVarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div data-testid="global-variable-provider" style={globalCSSVariables}>
      {children}
    </div>
  );
};

export default CSSVarProvider;

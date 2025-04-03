import { ReactNode } from "react";
import { globalCSSVariables } from "./globalVariables";
import { useViewport } from "../utils/useWindowSize/windowSizeContext";
import styles from "./styles.module.css";

const CSSVarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const viewport = useViewport();

  return (
    <div
      data-testid="global-variable-provider"
      className={styles.cssVarProvider}
      style={globalCSSVariables({ sizeKey: viewport })}
    >
      {children}
    </div>
  );
};

export default CSSVarProvider;

import styles from "./ControlButton.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { ReactNode } from "react";

export type ControlButtonProps = {
  text?: string;
  children?: ReactNode;
  //   icon?: ?
  onClick: (() => void) | undefined;
  inactive?: boolean;
  style?: React.CSSProperties;
};

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  inactive,
  text,
  children,
  style,
}) => {
  return (
    <button
      onClick={inactive ? undefined : onClick}
      className={cx(styles.controlButton, inactive && styles.inactiveButton)}
      style={style}
    >
      {text || children}
    </button>
  );
};

export default ControlButton;

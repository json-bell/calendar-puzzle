import styles from "./ControlButton.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { ReactNode } from "react";

export type ControlButtonProps = {
  text?: string;
  children?: ReactNode;
  //   icon?: ?
  onClick: (() => void) | undefined;
  inactive?: boolean;
};

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  inactive,
  text,
  children,
}) => {
  return (
    <button
      onClick={inactive ? undefined : onClick}
      className={cx(styles.controlButton, inactive && styles.inactiveButton)}
    >
      {text || children}
    </button>
  );
};

export default ControlButton;

import cx from "../../../../utils/concatClassNames/concatClassNames";
import styles from "./BinButton.module.css";

type BinButtonProps = {
  inactive?: boolean;
};

const BinButton: React.FC<BinButtonProps> = ({ inactive }) => {
  return (
    <div
      className={cx(styles.binWrapper, inactive && styles.inactiveWrapper)}
      style={{ zIndex: 1 }}
    >
      <span style={{ textAlign: "center", alignItems: "center" }}>BIN</span>
    </div>
  );
};

export default BinButton;

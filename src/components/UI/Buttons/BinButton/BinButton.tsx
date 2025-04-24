import { panelSizeByViewport } from "../../../../global/sizesByViewport";
import cx from "../../../../utils/concatClassNames/concatClassNames";
import { useViewport } from "../../../../utils/useWindowSize/windowSizeContext";
import BinIcon from "../../../Icons/BinIcon";
import styles from "./BinButton.module.css";

type BinButtonProps = {
  inactive?: boolean;
};

const BinButton: React.FC<BinButtonProps> = ({ inactive }) => {
  const viewport = useViewport();
  const panelSize = panelSizeByViewport[viewport];

  return (
    <div
      className={cx(styles.binWrapper, inactive && styles.inactiveWrapper)}
      style={{ zIndex: 1 }}
    >
      <BinIcon width={0.8 * panelSize - 4} />
    </div>
  );
};

export default BinButton;

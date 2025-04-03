import { panelSizeByViewport } from "../../../../global/sizesByViewport";
import cx from "../../../../utils/concatClassNames/concatClassNames";
import { useViewport } from "../../../../utils/useWindowSize/windowSizeContext";
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={`${0.75 * panelSize}`}
      >
        <path
          d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11V17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 11V17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BinButton;

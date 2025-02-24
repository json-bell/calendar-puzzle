import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

interface PlacedCellProps {
  isPanelSelected: boolean;
  isCellSelected: boolean;
}

const PlacedCell: React.FC<PlacedCellProps> = ({
  isCellSelected,
  isPanelSelected,
}) => (
  <div
    className={cx(
      styles.generalCell,
      styles.placedCell,
      isPanelSelected && styles.placedSelectedPanel,
      isCellSelected && styles.placedSelectedCell
    )}
  />
);
export default PlacedCell;

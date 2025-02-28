import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

interface PlacedCellProps {
  isPanelSelected: boolean;
  isCellSelected: boolean;
  pieceId: number;
}

const PlacedCell: React.FC<PlacedCellProps> = ({
  isCellSelected,
  isPanelSelected,
  pieceId,
}) => {
  return (
    <div
      className={cx(
        styles.generalCell,
        styles.placedCell,
        isPanelSelected && styles.placedSelectedPanel,
        isCellSelected && styles.placedSelectedCell
      )}
      style={
        isPanelSelected
          ? {}
          : {
              backgroundColor: `hsl(${36 * pieceId}, 100%, 50%)`,
            }
      }
    />
  );
};
export default PlacedCell;

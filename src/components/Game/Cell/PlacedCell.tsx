import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";
import getPlacedPieceColour from "./getPlacedPieceColour";

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
  const backgroundColor = ((): string => {
    if (isCellSelected) return "var(--cell-color-selected-placed)";
    return getPlacedPieceColour(pieceId);
  })();

  return (
    <div
      className={cx(
        styles.generalCell,
        styles.placedCell,
        isPanelSelected && styles.placedSelectedPanel,
        isCellSelected && styles.placedSelectedCell
      )}
      style={{ backgroundColor }}
    />
  );
};
export default PlacedCell;

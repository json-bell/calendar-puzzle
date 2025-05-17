import cx from "../../../utils/concatClassNames/concatClassNames";
import OrientationActionIcon from "../../Icons/SelectedCellControlIcon";
import styles from "./Cell.module.css";
import getPlacedPieceColour from "./getPlacedPieceColour";

interface PlacedCellProps {
  isPanelSelected: boolean;
  isCellSelected: boolean;
  isFlipped: boolean;
  pieceId: number;
}

const PlacedCell: React.FC<PlacedCellProps> = ({
  isCellSelected,
  isPanelSelected,
  isFlipped,
  pieceId,
}) => {
  const background = ((): string => {
    const options = isCellSelected ? { lightness: 20 } : undefined;
    const pieceColour = getPlacedPieceColour(pieceId, options);

    if (isFlipped) {
      return `linear-gradient(120deg, ${pieceColour} 10%, white 40%, ${pieceColour} 70%)`;
    }

    return pieceColour;
  })();

  const innerIconElement = isCellSelected ? (
    <div className={cx(styles.cellControlIcon)}>
      <OrientationActionIcon pieceId={pieceId} />
    </div>
  ) : null;

  return (
    <>
      <div
        className={cx(
          styles.generalCell,
          styles.placedCell,
          isPanelSelected && styles.placedSelectedPanel,
          isCellSelected && styles.placedSelectedCell
        )}
        style={{ background }}
      />
      {innerIconElement}
    </>
  );
};
export default PlacedCell;

import cx from "../../../utils/concatClassNames/concatClassNames";
import RotateIcon from "../../Icons/RotateIcon";
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

  const getInnerIconElement = () => {
    if (isCellSelected) return <RotateIcon />;
  };

  const innerIconElement = (
    <div className={cx(styles.cellControlIcon)}>{getInnerIconElement()}</div>
  );

  return (
    <>
      <div
        className={cx(
          styles.generalCell,
          styles.placedCell,
          isPanelSelected && styles.placedSelectedPanel,
          isCellSelected && styles.placedSelectedCell
        )}
        style={{ backgroundColor }}
      />
      {innerIconElement}
    </>
  );
};
export default PlacedCell;

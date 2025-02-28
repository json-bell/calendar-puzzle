import styles from "./PuzzlePiece.module.css";
import EmptyCell from "../Cell/EmptyCell";
import cx from "../../../utils/concatClassNames/concatClassNames";
import PreviewedCell from "../Cell/PreviewedCell";
import { panelSizeGlobal } from "../../../global/globalVariables";
import useGameState from "../../../context/Game/state";
import getRotatedPiece from "../../../puzzle/rotations/getRotatedPiece";
import { getRotatedCellCoords } from "../../../puzzle/rotations/getRotatedCellCoords";

export interface PiecePreviewProps {
  _: never;
}

const PiecePreview: React.FC = () => {
  const {
    userSelection: { selectedCell, selectedPiece, rotation, flipped },
  } = useGameState();

  if (!selectedPiece) return null;

  const shape = getRotatedPiece(selectedPiece.shape, rotation, flipped);
  const { rotatedCellX, rotatedCellY } = getRotatedCellCoords({
    cell: selectedCell,
    piece: selectedPiece,
    rotation,
    flipped,
  });

  return (
    <div
      className={cx(styles.piecePreview)}
      style={{
        left: `-${rotatedCellX * panelSizeGlobal}px`,
        top: `-${rotatedCellY * panelSizeGlobal}px`,
      }}
    >
      <div
        data-testid={`puzzle-piece-${selectedPiece.pieceId}`}
        className={cx(styles.puzzlePiece)}
      >
        {shape.map((row, cellY) => (
          <div className={styles.pieceRow} key={cellY}>
            {row.map((cellPresence, cellX) => {
              return cellPresence ? (
                <PreviewedCell
                  key={cellPresence.cellSlug}
                  pieceId={cellPresence.pieceId}
                />
              ) : (
                <EmptyCell key={`${cellX}-empty`} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PiecePreview;

import styles from "./PuzzlePiece.module.css";
import Cell from "../Cell/Cell";
import EmptyCell from "../Cell/EmptyCell";
import type { Piece } from "../../../puzzle/pieceTypes";
import cx from "../../../utils/concatClassNames/concatClassNames";
import useGameState from "../../../context/Game/state";
import getRotatedPiece from "../../../puzzle/rotations/getRotatedPiece";
import getPlacedPieceColour from "../Cell/getPlacedPieceColour";

export interface PuzzlePieceProps {
  piece: Piece;
  isPlaced?: boolean;
  rotateNonSquare?: boolean;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  piece,
  isPlaced = false,
  rotateNonSquare = false,
}) => {
  const {
    userSelection: { selectedPiece },
  } = useGameState();

  const isSelected = selectedPiece?.pieceId === piece.pieceId;

  const originalShape = piece.shape;

  const isSquare = originalShape.length === 3;

  const getPieceShape = () => {
    if (isSquare || !rotateNonSquare) return originalShape;
    return getRotatedPiece(originalShape, 3, 0);
  };

  const pieceShape = getPieceShape();

  const style: { [K in string]?: string } = (() => {
    const pieceColor = getPlacedPieceColour(piece.pieceId);
    if (isPlaced)
      return {
        "--cell-color": "grey",
      };
    if (isSelected) {
      return {
        "--cell-color": pieceColor,
      };
    }

    // unselected pieces in track:
    return {
      "--cell-color": pieceColor,
    };
  })();

  return (
    <div
      data-testid={`puzzle-piece-${piece.pieceId}`}
      className={cx(styles.puzzlePiece)}
      style={style}
    >
      {pieceShape.map((row, cellY) => (
        <div className={styles.pieceRow} key={cellY}>
          {row.map((cellPresence, cellX) => {
            return cellPresence ? (
              <Cell key={cellPresence.cellSlug} cell={cellPresence} />
            ) : (
              <EmptyCell key={`${cellX}-empty`} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PuzzlePiece;

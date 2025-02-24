import styles from "./PuzzlePiece.module.css";
import EmptyCell from "../Cell/EmptyCell";
import type { Piece } from "../../../puzzle/pieceTypes";
import cx from "../../../utils/concatClassNames/concatClassNames";
import getCellSlug from "../../../puzzle/cell/getCellSlug";
import PreviewedCell from "../Cell/PreviewedCell";

export interface PiecePreviewProps {
  piece: Piece;
}

const PiecePreview: React.FC<PiecePreviewProps> = ({ piece }) => {
  return (
    <div
      data-testid={`puzzle-piece-${piece.pieceId}`}
      className={cx(styles.puzzlePiece)}
    >
      {piece.shape.map((row, cellY) => (
        <div className={styles.pieceRow} key={cellY}>
          {row.map((isSquare, cellX) => {
            const cellSlug = getCellSlug({
              cellX,
              cellY,
              pieceId: piece.pieceId,
            });
            return isSquare ? (
              <PreviewedCell key={cellSlug} />
            ) : (
              <EmptyCell key={cellSlug} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PiecePreview;

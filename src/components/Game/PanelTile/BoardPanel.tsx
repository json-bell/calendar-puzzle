import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";
import useGameState from "../../../context/Game/state";
import { useState } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import { panelSizeGlobal } from "../../../global/globalVariables";
import useGameDispatch from "../../../context/Game/dispatch";
import { Actions } from "../../../context/Game/types";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection, board, gamePieces } = useGameState();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsPreviewing] = useState(false);

  const dispatch = useGameDispatch();
  const handlePlacePiece =
    selectedPiece &&
    (() => {
      dispatch({
        type: Actions.PLACE_PIECE,
        payload: {
          panelPosition: { panelX: panel.panelX, panelY: panel.panelY },
        },
      });
    });

  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  const coveringCell = board[panel.panelY][panel.panelX].coveredBy;

  const handlers = {
    onMouseEnter: () => setIsPreviewing(true),
    onMouseLeave: () => setIsPreviewing(false),
    onClick: () => handlePlacePiece?.(),
  };

  return (
    <button {...handlers} className={styles.panelWrapper}>
      {/* Panel */}
      <div
        className={cx(
          styles.panel,
          panel.type === "dayNumber" && styles.numberPanel,
          isPreviewing && selectedPiece && styles.previewedPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>
      {/* Piece Preview */}
      {isPreviewing && selectedPiece && (
        <div
          className={cx(styles.piecePreview)}
          style={{
            left: `-${selectedCell.cellX * panelSizeGlobal}px`,
            top: `-${selectedCell.cellY * panelSizeGlobal}px`,
          }}
        >
          <PuzzlePiece piece={selectedPiece} />
        </div>
      )}
      {coveringCell && (
        <div
          className={cx(styles.piecePlaced)}
          style={{
            left: `-${coveringCell.cellX * panelSizeGlobal}px`,
            top: `-${coveringCell.cellY * panelSizeGlobal}px`,
          }}
        >
          <PuzzlePiece piece={gamePieces[coveringCell.pieceId].piece} />
        </div>
      )}
    </button>
  );
};

export default BoardPanel;

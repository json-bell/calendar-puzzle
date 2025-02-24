import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";
import useGameState from "../../../context/Game/state";
import { useState } from "react";
import { panelSizeGlobal } from "../../../global/globalVariables";
import useGameDispatch from "../../../context/Game/dispatch";
import { Actions } from "../../../context/Game/types";
import PiecePreview from "../PuzzlePiece/PiecePreview";
import PlacedCell from "../Cell/PlacedCell";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection, board } = useGameState();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsPreviewing] = useState(false);

  const dispatch = useGameDispatch();

  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  const coveringCell = board[panel.panelY][panel.panelX].coveredBy;

  const handlePlacePiece = () => {
    // if (coveringCell) {
    //   if (coveringCell === selectedPiece) rotatePieceAroundCell();
    //   else selectCell(coveringCell);
    // }
    // else
    if (selectedPiece) {
      dispatch({
        type: Actions.PLACE_PIECE,
        payload: {
          panelPosition: { panelX: panel.panelX, panelY: panel.panelY },
        },
      });
    }
  };

  const handlers = {
    onMouseEnter: () => setIsPreviewing(true),
    onMouseLeave: () => setIsPreviewing(false),
    onClick: () => handlePlacePiece(),
  };

  return (
    <button {...handlers} className={styles.panelWrapper}>
      {/* Panel */}
      <div
        className={cx(
          styles.panel,
          panel.type === "dayNumber" && styles.numberPanel,
          isPreviewing && selectedPiece && styles.previewedPanel,
          coveringCell && styles.coveredPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>

      {/* Selected Piece Preview if Panel is Empty*/}
      {isPreviewing && selectedPiece && (
        <div
          className={cx(styles.piecePreview)}
          style={{
            left: `-${selectedCell.cellX * panelSizeGlobal}px`,
            top: `-${selectedCell.cellY * panelSizeGlobal}px`,
          }}
        >
          <PiecePreview piece={selectedPiece} />
        </div>
      )}

      {/* ISSUE: CURRENTLY EVERY TIME THERE'S A PIECE IT IS PLACING AN ENTIRE PIECE */}
      {coveringCell && (
        <>
          <PlacedCell
            isCellSelected={coveringCell.cellSlug === selectedCell?.cellSlug}
            isPanelSelected={coveringCell.pieceId === selectedCell?.pieceId}
          />
        </>
      )}
    </button>
  );
};

export default BoardPanel;

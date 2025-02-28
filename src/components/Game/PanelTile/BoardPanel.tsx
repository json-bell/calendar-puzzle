import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";
import useGameState from "../../../context/Game/state";
import { useState } from "react";
import useGameDispatch from "../../../context/Game/dispatch";
import { Actions } from "../../../context/Game/types";
import PiecePreview from "../PuzzlePiece/PiecePreview";
import PlacedCell from "../Cell/PlacedCell";

export interface PanelProps {
  panel: Panel;
}

type PanelSelectionState =
  | "coveringCellSelected"
  | "covered"
  | "placeable"
  | "nothing";

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection, board } = useGameState();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsPreviewing] = useState(false);

  const dispatch = useGameDispatch();

  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  const { coveringCells } = board[panel.panelY][panel.panelX];
  const coveringSlugs = coveringCells.map(({ cellSlug }) => cellSlug);
  const isCovered = coveringCells.length !== 0;
  const isPieceSelected =
    selectedCell &&
    coveringCells.map(({ pieceId }) => pieceId).includes(selectedCell?.pieceId);
  const isCellSelected =
    selectedCell && coveringSlugs.includes(selectedCell.cellSlug);

  const getPanelStatus: () => PanelSelectionState = () => {
    if (isCovered) return isCellSelected ? "coveringCellSelected" : "covered";
    return selectedPiece ? "placeable" : "nothing";
  };
  const panelStatus = getPanelStatus();

  const handlePlacePiece = () => {
    switch (panelStatus) {
      case "placeable": {
        dispatch({
          type: Actions.PLACE_PIECE,
          payload: { panel },
        });
        break;
      }
      case "covered": {
        dispatch({
          type: Actions.SELECT_PLAYED_PIECE,
          payload: { cell: coveringCells[0], panel },
        });
        break;
      }
      case "coveringCellSelected": {
        dispatch({
          type: Actions.ROTATE_SELECTED_PIECE,
          payload: { cell: coveringCells[0] },
        });
        break;
      }
      case "nothing": {
        break;
      }
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
          isCovered && styles.coveredPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>

      {/* Selected Piece Preview if Panel is Empty*/}
      {isPreviewing && panelStatus === "placeable" && <PiecePreview />}

      {/* ISSUE: CURRENTLY EVERY TIME THERE'S A PIECE IT IS PLACING AN ENTIRE PIECE */}
      {isCovered && (
        <>
          <PlacedCell
            isCellSelected={!!isCellSelected}
            isPanelSelected={!!isPieceSelected}
            pieceId={coveringCells[0].pieceId}
          />
        </>
      )}
    </button>
  );
};

export default BoardPanel;

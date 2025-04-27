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
import CellBorder from "../CellBorder/CellBorder";
import BinButton from "../../UI/Buttons/BinButton/BinButton";
import { useChallengeDate } from "../../../context/ChosenDate/ChallengeDateContext";

export interface PanelProps {
  panel: Panel;
}

type PanelSelectionState =
  | "coveringCellSelected"
  | "coveringPieceSelected"
  | "covered"
  | "placeable"
  | "nothing";

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection, board, gamePieces } = useGameState();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { checkIsChallengeValue } = useChallengeDate();
  const isChallengeValue = checkIsChallengeValue(panel.content);

  const dispatch = useGameDispatch();

  if (panel.type === "wall") {
    // Bin button
    const inactive = !(
      selectedPiece && gamePieces[selectedPiece?.pieceId].position
    );

    const removePiece = inactive
      ? undefined
      : () => {
          dispatch({
            type: Actions.REMOVE_PIECE,
            payload: { piece: selectedPiece },
          });
        };

    return (
      <button
        className={cx(styles.panelWrapper, styles.binButton)}
        onClick={removePiece}
      >
        <div
          className={cx(
            styles.panel,
            styles.wall,
            inactive && styles.inactiveBinPanel
          )}
        />
        <BinButton inactive={inactive} />
      </button>
    );
  }

  const { coveringCells } = board[panel.panelY][panel.panelX];
  const coveringSlugs = coveringCells.map(({ cellSlug }) => cellSlug);
  const isCovered = coveringCells.length !== 0;
  const isPieceSelected =
    selectedCell &&
    coveringCells.map(({ pieceId }) => pieceId).includes(selectedCell?.pieceId);
  const isCellSelected =
    selectedCell && coveringSlugs.includes(selectedCell.cellSlug);

  const getPanelStatus: () => PanelSelectionState = () => {
    if (isCovered) {
      if (isCellSelected) return "coveringCellSelected";
      if (isPieceSelected) return "coveringPieceSelected";
      return "covered";
    }

    if (selectedPiece) return "placeable";
    return "nothing";
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
      case "coveringPieceSelected": {
        dispatch({
          type: Actions.SELECT_PLAYED_PIECE,
          payload: {
            cell:
              coveringCells.find(
                ({ pieceId }) => pieceId === selectedPiece?.pieceId
              ) || coveringCells[0],
            panel,
          },
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

  const handlers: Partial<React.JSX.IntrinsicElements["button"]> = {
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
          isChallengeValue && styles.challengePanel,
          isCovered && styles.coveredPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>

      {/* Selected Piece Preview if Panel is Empty*/}
      {isPreviewing && panelStatus === "placeable" && <PiecePreview />}

      {/* Placed Pieces Preview */}
      {isCovered && (
        <PlacedCell
          isCellSelected={!!isCellSelected}
          isPanelSelected={!!isPieceSelected}
          pieceId={coveringCells[0].pieceId}
        />
      )}

      {/* Placed Pieces Borders */}
      {isCovered &&
        coveringCells.toReversed().map((cell) => {
          return (
            <CellBorder
              key={cell.cellSlug}
              cell={cell}
              rotation={gamePieces[cell.pieceId].position?.rotation}
              flipped={gamePieces[cell.pieceId].position?.flipped}
              isSelected={selectedPiece?.pieceId === cell.pieceId}
            />
          );
        })}
    </button>
  );
};

export default BoardPanel;

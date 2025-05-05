import { useState } from "react";
import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";
import type { CellType } from "../../../puzzle/pieceTypes";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import useGameState from "../../../context/Game/state";
import useGameDispatch from "../../../context/Game/dispatch";
import { Actions } from "../../../context/Game/types";

export interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const [hovered, setHovered] = useState(false);
  const { userSelection } = useGameState();
  const dispatch = useGameDispatch();
  const isSelected = userSelection.selectedCell?.cellSlug === cell.cellSlug;
  const isPieceSelected = userSelection.selectedPiece?.pieceId === cell.pieceId;
  const setSelectedPiece = (cell: CellType) => {
    dispatch({
      type: Actions.SELECT_SIDE_PIECE,
      payload: { cell, piece: puzzlePieces[cell.pieceId] },
    });
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => setSelectedPiece(cell),
  };

  return (
    <button
      data-testid={`cell-${cell.cellSlug}`}
      {...handlers}
      className={cx(
        styles.cell,
        styles.generalCell,
        hovered && styles.hoveredCell,
        isSelected && styles.selectedCell,
        isPieceSelected && styles.selectedPiece
      )}
    />
  );
};

export default Cell;

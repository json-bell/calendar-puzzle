import { useState } from "react";
import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";
import type { CellType } from "../../../puzzle/pieceTypes";
import useUserSelection from "../../../context/UserSelection/dispatch";
import puzzlePieces from "../../../puzzle/puzzlePieces";

export interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const [hovered, setHovered] = useState(false);
  const { userSelection, setUserSelection } = useUserSelection();
  const isSelected = userSelection.selectedCell?.cellSlug === cell.cellSlug;
  const setSelectedPiece = (cell: CellType) => {
    setUserSelection((currentSelection) => ({
      ...currentSelection,
      selectedPiece: puzzlePieces[cell.pieceId],
      selectedCell: cell,
    }));
  };
  // const [selectedCell, setSelectedCell] = useSelectedCell();

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => setSelectedPiece(cell),
  };

  return (
    <button
      data-testid="cell"
      {...handlers}
      className={cx(
        styles.cell,
        styles.generalCell,
        hovered && styles.hoveredCell,
        isSelected && styles.selectedCell
      )}
    />
  );
};

export default Cell;

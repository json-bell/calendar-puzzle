import { useState } from "react";
import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";
import type { CellType } from "../../../puzzle/pieceTypes";
import useSelectionDispatch from "../../../context/UserSelection/dispatch";
import puzzlePieces from "../../../puzzle/puzzlePieces";

export interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const [hovered, setHovered] = useState(false);
  const { setUserSelection } = useSelectionDispatch();
  const setSelectedPiece = (cell: CellType) => {
    setUserSelection((currentSelection) => ({
      ...currentSelection,
      selectedPiece: puzzlePieces[cell.pieceId],
      // ADD SELECTED CELL SO IT'S THE CELL THAT GOES THERE TOO
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
      {...handlers}
      className={cx(
        styles.cell,
        styles.generalCell,
        hovered && styles.hoveredCell
      )}
    />
  );
};

export default Cell;

import { useState } from "react";
import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

export type CellType = {
  pieceId: string;
  rowIndex: number;
  colIndex: number;
  cellId: string;
};

export interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = (/* { cell } */) => {
  const [hovered, setHovered] = useState(false);
  // const [selectedCell, setSelectedCell] = useSelectedCell();

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    // onClick: () => setSelectedCell(cell),
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

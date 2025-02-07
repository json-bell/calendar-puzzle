import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

export type CellType = { pieceId: string; rowIndex: number; colIndex: number };

export interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = () => {
  return <div className={cx(styles.square, styles.presentSquare)} />;
};

export default Cell;

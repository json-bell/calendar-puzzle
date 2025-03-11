import getBorderStyles from "../../../puzzle/pieceBorderLookup/getBorderStyles";
import { CellType } from "../../../puzzle/pieceTypes";
import { PieceFlipped, PieceRotation } from "../../../puzzle/types";
import styles from "./CellBorder.module.css";

type CellBorderProps = {
  cell: CellType;
  rotation?: PieceRotation;
  flipped?: PieceFlipped;
};

const CellBorder: React.FC<CellBorderProps> = ({
  cell,
  rotation = 0,
  flipped = 0,
}) => {
  const style = getBorderStyles({ ...cell, rotation, flipped });

  return <div className={styles.cellBorder} style={style} />;
};

export default CellBorder;

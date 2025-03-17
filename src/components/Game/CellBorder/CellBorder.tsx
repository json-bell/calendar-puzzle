import getBorderStyles from "../../../puzzle/pieceBorderLookup/getBorderStyles";
import { CellType } from "../../../puzzle/pieceTypes";
import { PieceFlipped, PieceRotation } from "../../../puzzle/types";
import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./CellBorder.module.css";

type CellBorderProps = {
  cell: CellType;
  rotation?: PieceRotation;
  flipped?: PieceFlipped;
  isSelected: boolean;
};

const CellBorder: React.FC<CellBorderProps> = ({
  cell,
  rotation = 0,
  flipped = 0,
  isSelected = false,
}) => {
  const style = getBorderStyles({
    ...cell,
    rotation,
    flipped,
    isSelected,
  });

  return (
    <div
      className={cx(styles.cellBorder, isSelected && styles.thickBorder)}
      style={style}
    />
  );
};

export default CellBorder;

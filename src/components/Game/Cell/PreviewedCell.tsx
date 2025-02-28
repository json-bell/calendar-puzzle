import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";
import getPlacedPieceColour from "./getPlacedPieceColour";

type PreviewedCellProps = { pieceId: number };

const PreviewedCell: React.FC<PreviewedCellProps> = ({ pieceId }) => (
  <div
    className={cx(styles.generalCell, styles.previewedCell)}
    style={{
      backgroundColor: getPlacedPieceColour(pieceId),
      border: "white dashed 2px",
    }}
  />
);
export default PreviewedCell;

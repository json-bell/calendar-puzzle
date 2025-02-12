import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";
import useUserSelection from "../../../context/UserSelection/dispatch";
import { useState } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import { panelSizeGlobal } from "../../../global/globalVariables";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection } = useUserSelection();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsHovered] = useState(false);

  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return (
    <button {...handlers} className={styles.panelWrapper}>
      {/* Panel */}
      <div
        className={cx(
          styles.panel,
          panel.type === "dayNumber" && styles.numberPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>
      {/* Piece Preview */}
      {isPreviewing && selectedPiece && (
        <div
          className={styles.piecePreview}
          style={{
            left: `-${selectedCell.x * panelSizeGlobal}px`,
            top: `-${selectedCell.y * panelSizeGlobal}px`,
          }}
        >
          <PuzzlePiece piece={selectedPiece} />
        </div>
      )}
    </button>
  );
};

export default BoardPanel;

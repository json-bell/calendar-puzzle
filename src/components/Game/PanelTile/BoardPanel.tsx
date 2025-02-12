import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";
import useGameState from "../../../context/Game/state";
import { useState } from "react";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import { panelSizeGlobal } from "../../../global/globalVariables";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  const { userSelection } = useGameState();
  const { selectedCell, selectedPiece } = userSelection;
  const [isPreviewing, setIsPreviewing] = useState(false);

  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  const handlers = {
    onMouseEnter: () => setIsPreviewing(true),
    onMouseLeave: () => setIsPreviewing(false),
  };

  return (
    <button {...handlers} className={styles.panelWrapper}>
      {/* Panel */}
      <div
        className={cx(
          styles.panel,
          panel.type === "dayNumber" && styles.numberPanel,
          isPreviewing && selectedPiece && styles.previewedPanel
        )}
      >
        {panel.type !== "empty" && formatContent(panel.content)}
      </div>
      {/* Piece Preview */}
      {isPreviewing && selectedPiece && (
        <div
          className={styles.piecePreview}
          style={{
            left: `-${selectedCell.cellX * panelSizeGlobal}px`,
            top: `-${selectedCell.cellY * panelSizeGlobal}px`,
          }}
        >
          <PuzzlePiece piece={selectedPiece} />
        </div>
      )}
    </button>
  );
};

export default BoardPanel;

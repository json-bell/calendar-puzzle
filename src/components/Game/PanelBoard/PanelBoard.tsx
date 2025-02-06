import React from "react";
import styles from "./PanelBoard.module.css";
import boardPanels from "../../../puzzle/boardData/boardPanels";
import PanelTyle from "../PanelTile/PanelTile";

const PanelBoard: React.FC = () => {
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardGrid}>
        {boardPanels.map((panelRow) =>
          panelRow.map((panel) => {
            return <PanelTyle panel={panel} />;
          })
        )}
      </div>
    </div>
  );
};

export default PanelBoard;

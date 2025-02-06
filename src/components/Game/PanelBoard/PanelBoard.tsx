import React from "react";
import styles from "./PanelBoard.module.css";
import boardPanels from "../../../puzzle/boardData/boardPanels";

const PanelBoard: React.FC = () => {
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardGrid}>
        {boardPanels.map((panelRow) =>
          panelRow.map((panel) => {
            return <div className={styles.panel}>{panel.content}</div>;
          })
        )}
      </div>
    </div>
  );
};

export default PanelBoard;

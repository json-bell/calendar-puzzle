import React from "react";
import styles from "./BoardPanel.module.css";
import { Panel } from "../../../puzzle/boardPanels/panels";
import concatStyles from "../../../utils/concatStyles/concatStyles";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  if (panel.type === "wall")
    return <div className={concatStyles(styles.panel, styles.wall)} />;
  return (
    <div
      className={concatStyles(
        styles.panel,
        panel.type === "dayNumber" && styles.numberPanel
      )}
    >
      {panel.type !== "empty" && panel.content}
    </div>
  );
};

export default BoardPanel;

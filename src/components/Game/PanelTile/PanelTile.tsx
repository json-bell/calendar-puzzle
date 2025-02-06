import React from "react";
import styles from "./Panel.module.css";
import { Panel } from "../../../puzzle/boardData/panels";

export interface PanelProps {
  panel: Panel;
}

const PanelTile: React.FC<PanelProps> = ({ panel }) => {
  return <div className={styles.panel}>{panel.content}</div>;
};

export default PanelTile;

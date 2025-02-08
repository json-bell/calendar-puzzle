import styles from "./BoardPanel.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { Panel } from "../../../puzzle/panelTypes";
import { formatContent } from "../../../puzzle/boardPanels/utils/formatContent";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  if (panel.type === "wall")
    return <div className={cx(styles.panel, styles.wall)} />;

  return (
    <div
      className={cx(
        styles.panel,
        panel.type === "dayNumber" && styles.numberPanel
      )}
    >
      {panel.type !== "empty" && formatContent(panel.content)}
    </div>
  );
};

export default BoardPanel;

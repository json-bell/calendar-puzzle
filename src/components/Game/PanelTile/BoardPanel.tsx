import styles from "./BoardPanel.module.css";
import { Panel, PanelContent } from "../../../puzzle/boardPanels/panels";
import concatStyles from "../../../utils/concatClassNames/concatClassNames";

export interface PanelProps {
  panel: Panel;
}

const BoardPanel: React.FC<PanelProps> = ({ panel }) => {
  if (panel.type === "wall")
    return <div className={concatStyles(styles.panel, styles.wall)} />;

  const formatContent = (content: PanelContent): string | number =>
    typeof content === "string" ? content.toUpperCase() : content;
  return (
    <div
      className={concatStyles(
        styles.panel,
        panel.type === "dayNumber" && styles.numberPanel
      )}
    >
      {panel.type !== "empty" && formatContent(panel.content)}
    </div>
  );
};

export default BoardPanel;

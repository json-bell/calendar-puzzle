import styles from "./BoardGrid.module.css";
import boardPanels from "../../../puzzle/boardPanels";
import BoardPanel from "../PanelTile/BoardPanel";

const BoardGrid: React.FC = () => {
  return (
    <>
      <div className={styles.boardWrapper}>
        <div className={styles.boardGrid}>
          {boardPanels.map((panelRow) =>
            panelRow.map((panel) => {
              return <BoardPanel key={panel.content} panel={panel} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default BoardGrid;

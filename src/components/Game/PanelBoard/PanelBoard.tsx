import styles from "./PanelBoard.module.css";
import boardPanels from "../../../puzzle/boardPanels";
import BoardPanel from "../PanelTile/BoardPanel";

const PanelBoard: React.FC = () => {
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

export default PanelBoard;

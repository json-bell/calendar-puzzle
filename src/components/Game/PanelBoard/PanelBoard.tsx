import React from "react";
import styles from "./PanelBoard.module.css";
import boardPanels from "../../../puzzle/boardPanels";
import BoardPanel from "../PanelTile/BoardPanel";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";

const PanelBoard: React.FC = () => {
  return (
    <>
      <div className={styles.boardWrapper}>
        <div className={styles.boardGrid}>
          {boardPanels.map((panelRow) =>
            panelRow.map((panel) => {
              return <BoardPanel panel={panel} />;
            })
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {puzzlePieces.map((piece) => (
          <PuzzlePiece piece={piece} />
        ))}
      </div>
    </>
  );
};

export default PanelBoard;

import PanelBoard from "../PanelBoard/PanelBoard";
import puzzlePieces from "../../../puzzle/puzzlePieces";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";

const GameArea = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Board */}
      <PanelBoard />

      {/* Pieces */}
      <div
        style={{
          display: "flex",
          gap: "80px",
          flexWrap: "wrap",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {puzzlePieces.map((piece) => (
          <PuzzlePiece piece={piece} key={piece.pieceId} />
        ))}
      </div>
    </section>
  );
};

export default GameArea;

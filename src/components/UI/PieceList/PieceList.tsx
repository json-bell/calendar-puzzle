import useGameState from "../../../context/Game/state";
import PuzzlePiece from "../../Game/PuzzlePiece/PuzzlePiece";
import styles from "./PieceList.module.css";

const PieceList: React.FC = () => {
  const { gamePieces } = useGameState();

  const processedGamePieces = gamePieces.toSorted(
    ({ position: a }, { position: b }) => {
      if (a && b) return 0;
      if (a) return 1;
      if (b) return -1;
      return 0;
    }
  );

  return (
    <div className={styles.pieceListContainer}>
      {processedGamePieces.map(({ piece, position }) => (
        <PuzzlePiece piece={piece} key={piece.pieceId} isPlaced={!!position} />
      ))}
    </div>
  );
};

export default PieceList;

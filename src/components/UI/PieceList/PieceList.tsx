import useGameState from "../../../context/Game/state";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { useViewport } from "../../../utils/useWindowSize/windowSizeContext";
import PuzzlePiece from "../../Game/PuzzlePiece/PuzzlePiece";
import styles from "./PieceList.module.css";
import { pieceListLayoutLookup } from "./utils";

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

  const viewport = useViewport();
  const trackDirection = pieceListLayoutLookup[viewport];

  return (
    <div
      className={cx(
        styles.pieceListContainer,
        styles[`${trackDirection}Scroll`]
      )}
    >
      {processedGamePieces.map(({ piece, position }) => (
        <PuzzlePiece
          piece={piece}
          key={piece.pieceId}
          isPlaced={!!position}
          rotateNonSquare={trackDirection === "horizontal"}
        />
      ))}
    </div>
  );
};

export default PieceList;

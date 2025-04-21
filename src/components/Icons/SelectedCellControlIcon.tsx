import useGameState from "../../context/Game/state";
import uniqueOrientations from "../../puzzle/rotations/uniqueOrientations";
import FlipIcon from "./FlipIcon";
import RotateIcon from "./RotateIcon";

type OrientationActionIconProps = {
  pieceId: number;
};

const OrientationActionIcon: React.FC<OrientationActionIconProps> = ({
  pieceId,
}) => {
  const { gamePieces } = useGameState();

  const currentPiece = gamePieces[pieceId];
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];

  if (uniqueFlips === 1 || !currentPiece.position) return <RotateIcon />;
  if (currentPiece.position.rotation + 1 === uniqueRotations) {
    const diagonal =
      uniqueRotations === 4
        ? "main"
        : currentPiece.position.flipped === 1
        ? "anti"
        : "main";
    return <FlipIcon diagonal={diagonal} />;
  }
  return <RotateIcon />;
};

export default OrientationActionIcon;

import useGameState from "../../context/Game/state";
import { panelSizeByViewport } from "../../global/sizesByViewport";
import uniqueOrientations from "../../puzzle/rotations/uniqueOrientations";
import { useViewport } from "../../utils/useWindowSize/windowSizeContext";
import FlipIcon from "./FlipIcon";
import RotateIcon from "./RotateIcon";

type OrientationActionIconProps = {
  pieceId: number;
};

const OrientationActionIcon: React.FC<OrientationActionIconProps> = ({
  pieceId,
}) => {
  const { gamePieces } = useGameState();

  const viewport = useViewport();
  const panelSize = panelSizeByViewport[viewport];

  const currentPiece = gamePieces[pieceId];
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];

  if (uniqueFlips === 1 || !currentPiece.position)
    return <RotateIcon width={panelSize} />;
  if (currentPiece.position.rotation + 1 === uniqueRotations) {
    const diagonal =
      uniqueRotations === 4
        ? "main"
        : currentPiece.position.flipped === 1
        ? "anti"
        : "main";
    return <FlipIcon diagonal={diagonal} width={panelSize} />;
  }
  return <RotateIcon width={panelSize} />;
};

export default OrientationActionIcon;

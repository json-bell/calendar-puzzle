import useGameState from "../../context/Game/state";
import { panelSizeByViewport } from "../../global/sizesByViewport";
import uniqueOrientations from "../../puzzle/rotations/uniqueOrientations";
import { useViewport } from "../../utils/useWindowSize/windowSizeContext";
import FlipIcon, { FlipIconProps } from "./FlipIcon";
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

  const { rotation, flipped } = currentPiece.position;
  if (
    (rotation + 1 === uniqueRotations && flipped === 0) ||
    (rotation === 0 && flipped === 1)
  ) {
    const mirror: FlipIconProps["mirror"] =
      uniqueRotations === 2 && flipped === 1 ? "horizontally" : "vertically";
    return <FlipIcon mirror={mirror} width={panelSize} />;
  }
  return <RotateIcon width={panelSize} />;
};

export default OrientationActionIcon;

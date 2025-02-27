import uniqueOrientations from "../../../puzzle/rotations/uniqueOrientations";
import {
  GamePiece,
  PieceFlipped,
  PieceRotation,
  UserSelection,
} from "../../../puzzle/types";

const increaseRotation = (
  input: { rotation: PieceRotation; flipped: PieceFlipped },
  pieceId: number
) => {
  const { uniqueFlips, uniqueRotations } = uniqueOrientations[pieceId];
  const rotation = ((input.rotation + 1) % uniqueRotations) as PieceRotation;
  const didRotationRollOver = rotation === 0;
  const flipped =
    uniqueFlips === 1
      ? 0
      : ((didRotationRollOver
          ? (input.flipped + 1) % 2
          : input.flipped) as PieceFlipped);
  return { rotation, flipped };
};

export const getRotatedUserSelection = (
  userSelection: UserSelection,
  pieceId: number
): UserSelection => {
  if (!userSelection.selectedCell) return userSelection;
  const { rotation, flipped } = increaseRotation(userSelection, pieceId);

  return { ...userSelection, rotation, flipped };
};

export const getRotatedPlacedPiece = (gamePiece: GamePiece): GamePiece => {
  const { position } = gamePiece;
  if (!position) return gamePiece;
  const { rotation, flipped } = increaseRotation(
    position,
    gamePiece.piece.pieceId
  );

  return { ...gamePiece, position: { ...position, rotation, flipped } };
};

export const shiftPieceToSelectedCell = ({
  flipped,
  rotation,
  selectedCell,
  selectedPanel,
  selectedPiece,
}: UserSelection): GamePiece | undefined => {
  if (!selectedCell || !selectedPanel) return;
  return {
    piece: selectedPiece,
    position: {
      cell: selectedCell,
      flipped,
      rotation,
      panelX: selectedPanel.panelX,
      panelY: selectedPanel.panelY,
    },
  };
};

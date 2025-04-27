import { GamePiece, UserSelection } from "../../../puzzle/types";
import increaseOrientation from "./increaseOrientation";

export const getRotatedUserSelection = (
  userSelection: UserSelection,
  pieceId: number
): UserSelection => {
  if (!userSelection.selectedCell) return userSelection;
  const { rotation, flipped } = increaseOrientation(userSelection, pieceId);

  return { ...userSelection, rotation, flipped };
};

export const getRotatedPlacedPiece = (gamePiece: GamePiece): GamePiece => {
  const { position } = gamePiece;
  if (!position) return gamePiece;
  const { rotation, flipped } = increaseOrientation(
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

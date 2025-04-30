import useGameDispatch from "../../../../../context/Game/dispatch";
import useGameState from "../../../../../context/Game/state";
import { Actions } from "../../../../../context/Game/types";
import ControlButton from "../../ControlButton";

const DeletePieceButton = () => {
  const {
    userSelection: { selectedPiece },
    gamePieces,
  } = useGameState();

  const dispatch = useGameDispatch();

  const inactive = !(
    selectedPiece && gamePieces[selectedPiece?.pieceId].position
  );

  const removePiece = inactive
    ? undefined
    : () => {
        dispatch({
          type: Actions.REMOVE_PIECE,
          payload: { piece: selectedPiece },
        });
      };

  return (
    <ControlButton onClick={removePiece} inactive={inactive}>
      Remove Piece
    </ControlButton>
  );
};

export default DeletePieceButton;

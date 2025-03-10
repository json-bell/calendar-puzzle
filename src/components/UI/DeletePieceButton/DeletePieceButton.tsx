import useGameDispatch from "../../../context/Game/dispatch";
import useGameState from "../../../context/Game/state";
import { Actions } from "../../../context/Game/types";
import styles from "./DeletePieceButton.module.css";
import cx from "../../../utils/concatClassNames/concatClassNames";

const DeletePieceButton = () => {
  const {
    userSelection: { selectedPiece },
    gamePieces,
  } = useGameState();

  const dispatch = useGameDispatch();

  const selectedPiecePosition =
    selectedPiece && gamePieces[selectedPiece?.pieceId].position;
  console.log({ selectedPiece }, selectedPiece?.pieceId);

  const removePiece = selectedPiecePosition
    ? () => {
        dispatch({
          type: Actions.REMOVE_PIECE,
          payload: { piece: selectedPiece },
        });
      }
    : undefined;

  return (
    <button
      onClick={removePiece}
      className={cx(
        styles.deleteButton,
        !selectedPiecePosition && styles.inactiveButton
      )}
    >
      Remove Piece
    </button>
  );

  return (
    <button className={cx(styles.deleteButton, styles.inactiveButton)}></button>
  );
};

export default DeletePieceButton;

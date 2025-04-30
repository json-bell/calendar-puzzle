import { createContext, useContext } from "react";
import { Game, UserSelection } from "../../puzzle/types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";
import puzzlePieces from "../../puzzle/puzzlePieces";
import { ChallengeDate } from "../ChosenDate/types";

export const noUserSelection: UserSelection = {
  rotation: null,
  flipped: null,
  selectedCell: null,
  selectedPanel: null,
  selectedPiece: null,
};

export const initialGameState: Game = {
  gamePieces: puzzlePieces.map((piece) => ({ piece, position: null })),
  userSelection: noUserSelection,
  board: getBoardFromPositions([]),
};

export const GameStateContext = createContext<
  Game & { checkIsChallengeValue: ChallengeDate["checkIsChallengeValue"] }
>({
  ...initialGameState,
  checkIsChallengeValue: () => {
    throw new Error(
      "Tried to check a challenge value without appropriately initialising game context"
    );
  },
});

const useGameState = () => useContext(GameStateContext);

export default useGameState;

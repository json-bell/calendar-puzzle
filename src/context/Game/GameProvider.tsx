import { ActionDispatch, ReactNode, useReducer } from "react";
import { GameStateContext, initialGameState } from "./state";
import { GameDispatchContext } from "./dispatch";
import gameReducer from "./reducer";
import { Actions, GameAction } from "./types";
import { Game } from "../../puzzle/types";
import { useChallengeDate } from "../ChosenDate/ChallengeDateContext";

const actionsUpdatingBoard = [
  Actions.PLACE_SELECTED_PIECE,
  Actions.REMOVE_PIECE,
  Actions.ROTATE_PIECE,
  Actions.ROTATE_SELECTED_PIECE,
];

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, gameDispatch] = useReducer<Game, [action: GameAction]>(
    gameReducer,
    initialGameState
  );

  const { checkIsChallengeValue } = useChallengeDate();

  const wrappedDispatch: ActionDispatch<[action: GameAction]> = (action) => {
    if (actionsUpdatingBoard.includes(action.type)) {
      gameDispatch({
        ...action,
        meta: { checkIsChallengeValue },
      });
    } else gameDispatch(action);
  };

  return (
    <GameStateContext.Provider value={{ ...gameState, checkIsChallengeValue }}>
      <GameDispatchContext.Provider value={wrappedDispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export default GameProvider;

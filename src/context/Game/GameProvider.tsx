import { ReactNode, useReducer } from "react";
import { GameStateContext, initialGameState } from "./state";
import { GameDispatchContext } from "./dispatch";
import gameReducer from "./reducer";
import { GameAction } from "./types";
import { Game } from "../../puzzle/types";

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, gameDispatch] = useReducer<Game, [action: GameAction]>(
    gameReducer,
    initialGameState
  );

  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={gameDispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export default GameProvider;

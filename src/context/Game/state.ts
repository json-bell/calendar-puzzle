import { createContext, useContext } from "react";
import { Game } from "../../puzzle/types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";

export const initialGameState: Game = {
  piecePositions: [],
  board: getBoardFromPositions([]),
};

export const GameStateContext = createContext<Game>(initialGameState);

const useGameState = () => useContext(GameStateContext);

export default useGameState;

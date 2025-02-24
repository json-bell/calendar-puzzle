import { createContext, useContext } from "react";
import { Game } from "../../puzzle/types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";
import puzzlePieces from "../../puzzle/puzzlePieces";

export const initialGameState: Game = {
  gamePieces: puzzlePieces.map((piece) => ({ piece, position: null })),
  userSelection: {
    rotation: null,
    selectedCell: null,
    selectedPanel: null,
    selectedPiece: null,
  },
  board: getBoardFromPositions([]),
};

export const GameStateContext = createContext<Game>(initialGameState);

const useGameState = () => useContext(GameStateContext);

export default useGameState;

import { ReactNode, useEffect, useState } from "react";
import { GameStateContext, initialGameState } from "./state";
import { Game } from "../../puzzle/types";
import { GameDispatchContext } from "./dispatch";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<Game>(initialGameState);
  const piecePositions = gameState.piecePositions;

  useEffect(() => {
    setGameState(({ piecePositions }) => ({
      piecePositions,
      board: getBoardFromPositions(piecePositions),
    }));
  }, [piecePositions]);

  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={setGameState}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export default GameProvider;

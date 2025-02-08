import { createContext, ReactNode } from "react";
import { Game } from "../../../puzzle/types";

export interface GameProviderProps {
  children: ReactNode;
}

const GameContext = createContext<null | Game>(null);

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  return <GameContext.Provider value={null}>{children}</GameContext.Provider>;
};

export default GameProvider;

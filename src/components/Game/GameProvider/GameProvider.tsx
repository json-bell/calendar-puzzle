import { ReactNode } from "react";

export interface GameProviderProps {
  children: ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default GameProvider;

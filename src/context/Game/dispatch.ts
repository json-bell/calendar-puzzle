import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Game } from "../../puzzle/types";

type GameDispatch = Dispatch<SetStateAction<Game>>;

export const GameDispatchContext = createContext<GameDispatch>(() => {});

const useGameDispatch = () => useContext(GameDispatchContext);

export default useGameDispatch;

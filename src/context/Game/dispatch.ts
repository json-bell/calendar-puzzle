import { createContext, Dispatch, useContext } from "react";
import { GameAction } from "./types";

type GameDispatch = Dispatch<GameAction>;

export const GameDispatchContext = createContext<GameDispatch>(() => {});

const useGameDispatch = () => useContext(GameDispatchContext);

export default useGameDispatch;

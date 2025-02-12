import { Reducer } from "react";
import { Game } from "../../puzzle/types";
import { GameAction, Actions } from "./types";

const gameReducer: Reducer<Game, GameAction> = (state, action) => {
  switch (action.type) {
    case Actions.SELECT_PIECE:
      return state;
    case Actions.PICK_UP_PIECE:
      return state;
    case Actions.PLACE_PIECE:
      return state;
    case Actions.ROTATE_PIECE:
      return state;
    default:
      return state;
  }
};

export default gameReducer;

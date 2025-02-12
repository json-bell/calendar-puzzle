import { Reducer } from "react";
import { Game, GamePiece } from "../../puzzle/types";
import { GameAction, Actions } from "./types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";

const gameReducer: Reducer<Game, GameAction> = (state, action) => {
  switch (action.type) {
    case Actions.SELECT_PLAYED_PIECE: {
      return state;
    }
    case Actions.SELECT_SIDE_PIECE: {
      return {
        ...state,
        userSelection: {
          ...state.userSelection,
          selectedCell: action.payload.cell,
          selectedPiece: action.payload.piece,
        },
      };
    }
    case Actions.REMOVE_PIECE: {
      return state;
    }
    case Actions.PLACE_PIECE: {
      const {
        panelPosition: { panelX, panelY },
      } = action.payload;
      const { selectedCell, selectedPiece, rotation } = state.userSelection;
      if (!selectedCell) return state;
      const gamePieces: GamePiece[] = state.gamePieces.map((gamePiece) => {
        const { piece, position } = gamePiece;
        return selectedPiece?.pieceId === piece.pieceId
          ? {
              piece,
              position: {
                cell: selectedCell,
                rotation: rotation ?? 0,
                panelX,
                panelY,
              },
            }
          : { piece, position };
      });
      const board = getBoardFromPositions(gamePieces);
      return { ...state, board, gamePieces };
    }
    case Actions.ROTATE_PIECE: {
      return state;
    }
  }
};

export default gameReducer;

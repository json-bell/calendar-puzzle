import { Reducer } from "react";
import { Game, GamePiece, UserSelection } from "../../puzzle/types";
import { GameAction, Actions } from "./types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";

const gameReducer: Reducer<Game, GameAction> = (state, action) => {
  switch (action.type) {
    case Actions.SELECT_PLAYED_PIECE: {
      const { panel, cell } = action.payload;
      const { piece, position } = state.gamePieces[cell.pieceId];
      const { rotation, flipped } = position || { rotation: 0, flipped: 0 };
      const userSelection: UserSelection = {
        rotation,
        flipped,
        selectedCell: cell,
        selectedPanel: panel,
        selectedPiece: piece,
      };
      return { ...state, userSelection };
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
        panel: { panelX, panelY },
      } = action.payload;
      const { selectedCell, selectedPiece, rotation, flipped } =
        state.userSelection;
      if (!selectedCell) return state;
      const gamePieces: GamePiece[] = state.gamePieces.map((gamePiece) => {
        const { piece, position } = gamePiece;
        return selectedPiece?.pieceId === piece.pieceId
          ? {
              piece,
              position: {
                cell: selectedCell,
                rotation: rotation ?? 0,
                flipped: flipped ?? 0,
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

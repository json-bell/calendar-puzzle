import { Reducer } from "react";
import { Game, GamePiece, UserSelection } from "../../puzzle/types";
import { GameAction, Actions } from "./types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";
import {
  getRotatedPlacedPiece,
  getRotatedUserSelection,
  shiftPieceToSelectedCell,
} from "./utils/reducerUtils";
import { initialGameState, noUserSelection } from "./state";

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

      const gamePieces = [...state.gamePieces];
      const shiftedGamePiece = shiftPieceToSelectedCell(userSelection);
      if (shiftedGamePiece) gamePieces[cell.pieceId] = shiftedGamePiece;

      return { ...state, userSelection, gamePieces };
    }
    case Actions.SELECT_SIDE_PIECE: {
      return {
        ...state,
        userSelection: {
          ...state.userSelection,
          selectedCell: action.payload.cell,
          selectedPiece: action.payload.piece,
          rotation: 0,
          flipped: 0,
        },
      };
    }
    case Actions.REMOVE_PIECE: {
      const { piece } = action.payload;

      const gamePieces = state.gamePieces.map((gamePiece) =>
        gamePiece.piece.pieceId !== piece.pieceId
          ? gamePiece
          : { ...gamePiece, position: null }
      );

      const board = getBoardFromPositions(gamePieces);

      return {
        ...state,
        gamePieces,
        board,
        userSelection: noUserSelection,
      };
    }
    case Actions.REMOVE_ALL_PIECES: {
      const { gamePieces, board, userSelection } = initialGameState;
      return {
        ...state,
        gamePieces,
        board,
        userSelection,
      };
    }
    case Actions.PLACE_PIECE: {
      const {
        panel: { panelX, panelY },
      } = action.payload;
      const { selectedCell, selectedPiece, rotation, flipped } =
        state.userSelection;
      if (!selectedCell) return state;
      const gamePieces: GamePiece[] = state.gamePieces.map((gamePiece) => {
        const { piece } = gamePiece;
        return selectedPiece?.pieceId === piece.pieceId
          ? {
              piece,
              position: {
                cell: selectedCell,
                rotation,
                flipped,
                panelX,
                panelY,
              },
            }
          : gamePiece;
      });
      const board = getBoardFromPositions(gamePieces);
      return { ...state, board, gamePieces };
    }
    case Actions.ROTATE_SELECTED_PIECE: {
      if (!state.userSelection.selectedCell) return state;
      const { pieceId } = state.userSelection.selectedCell;
      const userSelection = getRotatedUserSelection(
        state.userSelection,
        pieceId
      );

      const gamePieces = [...state.gamePieces];
      gamePieces[pieceId] = getRotatedPlacedPiece(gamePieces[pieceId]);
      const board = getBoardFromPositions(gamePieces);

      return {
        ...state,
        userSelection,
        gamePieces,
        board,
      };
    }
    case Actions.ROTATE_PIECE: {
      return state;
    }
  }
};

export default gameReducer;

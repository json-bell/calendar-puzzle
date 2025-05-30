import { Reducer } from "react";
import { Board, Game, GamePiece, UserSelection } from "../../puzzle/types";
import { GameAction, Actions } from "./types";
import getBoardFromPositions from "../../puzzle/game/getBoardFromPositions";
import {
  getRotatedPlacedPiece,
  getRotatedUserSelection,
  shiftPieceToSelectedCell,
} from "./utils/reducerUtils";
import { initialGameState, noUserSelection } from "./state";
import checkWin from "../../puzzle/challenge/checkWin";
import countFlips from "../../puzzle/challenge/countFlips";
import { addExtraPiecePositions } from "../../puzzle/game/expandPositions";

const gameReducer: Reducer<Game, GameAction> = (state, action) => {
  const updateBoardAndCheckWin = ({
    gamePieces,
  }: {
    gamePieces: GamePiece[];
  }): Pick<Game, "board" | "winDetails"> => {
    const board: Board = getBoardFromPositions(gamePieces);

    const { isWin } = checkWin({
      checkIsChallengeValue: action.meta?.checkIsChallengeValue,
      board,
      gamePieces,
    });
    const winDetails = { isWin, flippedPieceCount: countFlips(gamePieces) };

    return { board, winDetails };
  };

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

      const { board, winDetails } = updateBoardAndCheckWin({ gamePieces });

      return {
        ...state,
        gamePieces,
        board,
        winDetails,
        userSelection: noUserSelection,
      };
    }
    case Actions.REMOVE_ALL_PIECES: {
      const { gamePieces, board, userSelection } = initialGameState;
      return {
        ...state,
        gamePieces,
        board,
        winDetails: { isWin: false },
        userSelection,
      };
    }
    case Actions.PLACE_SELECTED_PIECE: {
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
      const { board, winDetails } = updateBoardAndCheckWin({ gamePieces });
      return { ...state, board, winDetails, gamePieces };
    }
    case Actions.PLACE_PIECES: {
      const { positionMap } = action.payload;

      const gamePieces: GamePiece[] = addExtraPiecePositions({
        gamePieces: state.gamePieces,
        positionMap,
      });

      const { board, winDetails } = updateBoardAndCheckWin({ gamePieces });

      return { ...state, board, winDetails, gamePieces };
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
      const { board, winDetails } = updateBoardAndCheckWin({ gamePieces });

      return {
        ...state,
        userSelection,
        gamePieces,
        board,
        winDetails,
      };
    }
    case Actions.ROTATE_PIECE: {
      return state;
    }
  }
};

export default gameReducer;

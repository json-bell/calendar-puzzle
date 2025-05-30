import { Panel } from "../../puzzle/panelTypes";
import { CellType, Piece } from "../../puzzle/pieceTypes";
import { PositionMap, PieceRotation } from "../../puzzle/types";
import { ChallengeDate } from "../ChosenDate/types";

export enum Actions {
  SELECT_PLAYED_PIECE = "SELECT_PLAYED_PIECE",
  SELECT_SIDE_PIECE = "SELECT_SIDE_PIECE",
  PLACE_SELECTED_PIECE = "PLACE_SELECTED_PIECE",
  PLACE_PIECES = "PLACE_PIECES",
  ROTATE_PIECE = "ROTATE_PIECE",
  ROTATE_SELECTED_PIECE = "ROTATE_SELECTED_PIECE",
  REMOVE_PIECE = "REMOVE_PIECE",
  REMOVE_ALL_PIECES = "REMOVE_ALL_PIECES",
}

type Payload = {
  piece: Piece;
  cell: CellType;
  rotation: PieceRotation;
  panelPosition: { panelX: number; panelY: number };
  panel: Panel;
  positionMap: PositionMap;
};

type WithMeta<A extends { type: Actions }> = A & {
  meta?: {
    checkIsChallengeValue?: ChallengeDate["checkIsChallengeValue"];
  };
};

export type GameActionBase = { type: Actions; payload?: Partial<Payload> } & (
  | {
      type: Actions.SELECT_PLAYED_PIECE;
      payload: Pick<Payload, "panel" | "cell">;
    }
  | {
      type: Actions.SELECT_SIDE_PIECE;
      payload: Pick<Payload, "piece" | "cell">;
    }
  | { type: Actions.PLACE_SELECTED_PIECE; payload: Pick<Payload, "panel"> }
  | { type: Actions.PLACE_PIECES; payload: Pick<Payload, "positionMap"> }
  | { type: Actions.ROTATE_PIECE /* ,...Details */ }
  | { type: Actions.ROTATE_SELECTED_PIECE; payload: Pick<Payload, "cell"> }
  | { type: Actions.REMOVE_PIECE; payload: Pick<Payload, "piece"> }
  | { type: Actions.REMOVE_ALL_PIECES; payload?: never }
);

export type GameAction = WithMeta<GameActionBase>;

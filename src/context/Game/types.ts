import { Panel } from "../../puzzle/panelTypes";
import { CellType, Piece } from "../../puzzle/pieceTypes";
import { PieceRotation } from "../../puzzle/types";

export enum Actions {
  SELECT_PLAYED_PIECE = "SELECT_PLAYED_PIECE",
  SELECT_SIDE_PIECE = "SELECT_SIDE_PIECE",
  PLACE_PIECE = "PLACE_PIECE",
  ROTATE_PIECE = "ROTATE_PIECE",
  ROTATE_SELECTED_PIECE = "ROTATE_SELECTED_PIECE",
  REMOVE_PIECE = "REMOVE_PIECE",
}

type Payload = {
  piece: Piece;
  cell: CellType;
  rotation: PieceRotation;
  panelPosition: { panelX: number; panelY: number };
  panel: Panel;
};

export type GameAction = { type: Actions; payload?: Partial<Payload> } & (
  | {
      type: Actions.SELECT_PLAYED_PIECE;
      payload: Pick<Payload, "panel" | "cell">;
    }
  | {
      type: Actions.SELECT_SIDE_PIECE;
      payload: Pick<Payload, "piece" | "cell">;
    }
  | { type: Actions.PLACE_PIECE; payload: Pick<Payload, "panel"> }
  | { type: Actions.ROTATE_PIECE /* ,...Details */ }
  | { type: Actions.ROTATE_SELECTED_PIECE; payload: Pick<Payload, "cell"> }
  | { type: Actions.REMOVE_PIECE /* ,...Details */ }
);

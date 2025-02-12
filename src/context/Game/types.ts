import { CellType, Piece } from "../../puzzle/pieceTypes";
import { PieceRotation } from "../../puzzle/types";

export enum Actions {
  SELECT_PLAYED_PIECE = "SELECT_PLAYED_PIECE",
  SELECT_SIDE_PIECE = "SELECT_SIDE_PIECE",
  PLACE_PIECE = "PLACE_PIECE",
  ROTATE_PIECE = "ROTATE_PIECE ",
  PICK_UP_PIECE = "PICK_UP_PIECE",
}

type Payload = {
  piece: Piece;
  cell: CellType;
  rotation: PieceRotation;
  panelPosition: { panelX: number; panelY: number };
};

export type GameAction = { type: Actions; payload?: Partial<Payload> } & (
  | { type: Actions.SELECT_PLAYED_PIECE /* ,...Details */ }
  | {
      type: Actions.SELECT_SIDE_PIECE;
      payload: Pick<Payload, "piece" | "cell">;
    }
  | { type: Actions.PLACE_PIECE /* ,...Details */ }
  | { type: Actions.ROTATE_PIECE /* ,...Details */ }
  | { type: Actions.PICK_UP_PIECE /* ,...Details */ }
);

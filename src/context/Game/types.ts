import { PieceRotation } from "../../puzzle/types";

export enum Actions {
  SELECT_PIECE = "SELECT_PIECE", // ??
  PLACE_PIECE = "PLACE_PIECE",
  ROTATE_PIECE = "ROTATE_PIECE ",
  PICK_UP_PIECE = "PICK_UP_PIECE",
}

type Payload = {
  pieceId: number;
  cellId: string;
  rotation: PieceRotation;
  panelPosition: { panelX: number; panelY: number };
};

export type GameAction = { type: Actions; payload?: Payload } & (
  | { type: Actions.SELECT_PIECE /* ,...Details */ }
  | { type: Actions.PLACE_PIECE /* ,...Details */ }
  | { type: Actions.ROTATE_PIECE /* ,...Details */ }
  | { type: Actions.PICK_UP_PIECE /* ,...Details */ }
);

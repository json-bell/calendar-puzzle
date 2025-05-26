import getCellSlug from "../../cell/getCellSlug";
import { CellType } from "../../pieceTypes";
import puzzlePieces from "../../puzzlePieces";
import { PieceId } from "../../puzzlePieces/pieceIds";
import { GamePiece, PiecePosition, PositionMap } from "../../types";
import {
  addExtraPiecePositions,
  expandSinglePiecePosition,
  MinimalPosition,
} from "../expandPositions";

describe("expandPiecePositions", () => {
  describe("expandSinglePiecePosition", () => {
    it("returns the input if it is a full PiecePosition", () => {
      const position: PiecePosition = {
        cell: "testCell" as unknown as CellType,
        flipped: 1,
        panelX: 4,
        panelY: 2,
        rotation: 3,
      };

      expect(
        expandSinglePiecePosition({
          ...position,
          pieceId: "unused" as unknown as PieceId,
        })
      ).toEqual(position);
    });

    it("fills any missing fields", () => {
      const minimalPos: MinimalPosition = {
        panelX: 2,
        panelY: 1,
        pieceId: 5,
      };
      const expected: PiecePosition = {
        cell: {
          cellSlug: getCellSlug({ cellX: 0, cellY: 0, pieceId: 5 }),
          cellX: 0,
          cellY: 0,
          pieceId: 5,
        },
        flipped: 0,
        rotation: 0,
        panelX: 2,
        panelY: 1,
      };

      expect(expandSinglePiecePosition(minimalPos)).toEqual(expected);
    });
  });
});

describe("addExtraPiecePositions", () => {
  it("doesn't affect gamePieces if no positions are provided anywhere", () => {
    const gamePieces: GamePiece[] = puzzlePieces.map((piece) => ({
      piece,
      position: null,
    }));
    const positionMap = {};

    expect(addExtraPiecePositions({ gamePieces, positionMap })).toEqual(
      gamePieces
    );
  });

  it("overwrites specified gamePieces", () => {
    const gamePieces: GamePiece[] = puzzlePieces.map((piece, index) => ({
      piece,
      position: `old-position-${index}` as unknown as PiecePosition,
    }));
    const positionMap: PositionMap = {
      1: "new-position-1" as unknown as PiecePosition,
      3: "new-position-3" as unknown as PiecePosition,
      5: "new-position-5" as unknown as PiecePosition,
    };

    const updatedPieces = addExtraPiecePositions({ gamePieces, positionMap });

    [1, 3, 5].forEach((id) => {
      expect(updatedPieces[id]).toEqual({
        piece: gamePieces[id].piece,
        position: `new-position-${id}`,
      });
    });
  });
  it("doesn't overwrite not-specified gamePieces", () => {
    const gamePieces: GamePiece[] = puzzlePieces.map((piece, index) => ({
      piece,
      position: `old-position-${index}` as unknown as PiecePosition,
    }));
    const positionMap: PositionMap = {
      1: "new-position-1" as unknown as PiecePosition,
      3: "new-position-3" as unknown as PiecePosition,
      5: "new-position-5" as unknown as PiecePosition,
      7: undefined,
    };

    const updatedPieces = addExtraPiecePositions({ gamePieces, positionMap });

    [0, 2, 4, 6, 7].forEach((id) => {
      expect(updatedPieces[id]).toEqual({
        piece: gamePieces[id].piece,
        position: `old-position-${id}`,
      });
    });
  });
});

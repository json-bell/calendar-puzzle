import { Piece } from "../pieceTypes";
import getUniquePieceOrientations, {
  getOrientationsFromPiece,
} from "./getUniquePieceOrientations";
import uniqueOrientations from "./uniqueOrientations";

const orientationTest = [
  [{ rotation: 2, flip: 1 }, { shape: [[true, true, true]] }],
  [
    { rotation: 4, flip: 1 },
    {
      shape: [
        [true, true, true],
        [false, true, false],
        [false, true, false],
      ],
    },
  ],
  [
    { rotation: 2, flip: 2 },
    {
      shape: [
        [true, true, false],
        [false, true, false],
        [false, true, true],
      ],
    },
  ],
];

describe("uniqueOrientations", () => {
  it("matches generateUniqueOrientations", () => {
    expect(getUniquePieceOrientations()).toEqual(uniqueOrientations);
  });
  it("correctly gets simplest rotation and flip", () => {
    const { uniqueRotations, uniqueFlips } = getOrientationsFromPiece(
      [[true]],
      0
    );
    expect(uniqueRotations).toBe(1);
    expect(uniqueFlips).toBe(1);
  });
  it("correctly extends full orbit", () => {
    const { uniqueRotations, uniqueFlips } = getOrientationsFromPiece(
      [
        [true, false, false],
        [true, true, true],
        [false, true, false],
      ],
      0
    );
    expect(uniqueRotations).toBe(4);
    expect(uniqueFlips).toBe(2);
  });
  describe("correctly find partial orbits", () => {
    it.each(orientationTest)(
      "finds a piece",
      ({ rotation: expectedRotation, flip: expectedFlip }, { shape }) => {
        const { uniqueRotations, uniqueFlips } = getOrientationsFromPiece(
          shape as Piece["shape"],
          0
        );
        expect(uniqueRotations).toBe(expectedRotation);
        expect(uniqueFlips).toBe(expectedFlip);
      }
    );
  });
});

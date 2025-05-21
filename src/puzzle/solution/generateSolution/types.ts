import { DayName, DayNumber, Month } from "../../boardPanels/dateData";
import { GamePiece } from "../../types";

export type Solution = {
  dayName: DayName;
  dayNumber: DayNumber;
  month: Month;
  piecePositions: GamePiece[];
};

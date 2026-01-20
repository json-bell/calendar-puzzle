import { DayName, DayNumber, Month } from "../../boardPanels/dateData";
import { GamePiece } from "../../types";

/**
 * @deprecated
 */
export type Solution = {
  dayName: DayName;
  dayNumber: DayNumber;
  month: Month;
  pieces: GamePiece[];
};

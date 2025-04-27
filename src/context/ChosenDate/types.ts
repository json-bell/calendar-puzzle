import { DayName, DayNumber, Month } from "../../puzzle/boardPanels/dateData";
import { PanelContent } from "../../puzzle/panelTypes";

export type ChallengeDate = {
  date: Date;
  dayName: DayName;
  dayNumber: DayNumber;
  month: Month;
  getIsChallengeValue: (value: PanelContent) => boolean;
};

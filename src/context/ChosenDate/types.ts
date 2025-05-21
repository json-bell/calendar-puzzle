import { DayName, DayNumber, Month } from "../../puzzle/boardPanels/dateData";
import { PanelContent } from "../../puzzle/panelTypes";

export type ChallengeGoal = {
  dayName: DayName;
  dayNumber: DayNumber;
  month: Month;
};

export type ChallengeDate = ChallengeGoal & {
  date: Date;
  checkIsChallengeValue: (value: PanelContent) => boolean;
};

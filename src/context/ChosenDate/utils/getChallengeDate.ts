import {
  dayNames,
  DayNumber,
  months,
} from "../../../puzzle/boardPanels/dateData";
import { PanelContent } from "../../../puzzle/panelTypes";
import { ChallengeDate } from "../types";

const getChallengeDate = (date: Date): ChallengeDate => {
  const dayName = dayNames[date.getDay()];
  const dayNumber = date.getDate() as DayNumber;
  const month = months[date.getMonth()];

  const getIsChallengeValue = (value: PanelContent) => {
    if (value === dayName || value === dayNumber || value === month)
      return true;
    return false;
  };

  return {
    date,
    dayName,
    dayNumber,
    month,
    getIsChallengeValue,
  };
};

export default getChallengeDate;

import {
  dayNames,
  DayNumber,
  months,
} from "../../../puzzle/boardPanels/dateData";
import { ChallengeDate } from "../types";

const getChallengeDate = (date: Date): ChallengeDate => {
  return {
    date,
    dayName: dayNames[date.getDay()],
    dayNumber: date.getDate() as DayNumber,
    month: months[date.getMonth()],
  };
};

export default getChallengeDate;

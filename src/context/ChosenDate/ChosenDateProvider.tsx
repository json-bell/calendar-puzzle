import { ReactNode, useState } from "react";
import getChallengeDate from "./utils/getChallengeDate";
import {
  ChallengeDateContext,
  ChallengeDateDispatchContext,
} from "./ChallengeDateContext";

export const ChallengeDateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setChallengeDate] = useState(new Date());
  const incrementChallengeDate = (increment: number) => {
    if (increment === 0) return;
    setChallengeDate((currDate) => {
      const newDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate() + increment
      );
      return newDate;
    });
  };
  const challengeDate = getChallengeDate(selectedDate);
  return (
    <ChallengeDateContext.Provider value={challengeDate}>
      <ChallengeDateDispatchContext
        value={{ setChallengeDate, incrementChallengeDate }}
      >
        {children}
      </ChallengeDateDispatchContext>
    </ChallengeDateContext.Provider>
  );
};

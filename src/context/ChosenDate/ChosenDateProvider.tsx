import { ReactNode, useMemo, useState } from "react";
import { ChallengeDate } from "./types";
import getChallengeDate from "./utils/getChallengeDate";
import {
  ChallengeDateContext,
  ChallengeDateDispatchContext,
} from "./ChallengeDateContext";

export const ChallengeDateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const clientDate = useMemo(() => new Date(), []);
  const [challengeDate, setChallengeDate] = useState<ChallengeDate>(
    getChallengeDate(clientDate)
  );
  return (
    <ChallengeDateContext.Provider value={challengeDate}>
      <ChallengeDateDispatchContext value={setChallengeDate}>
        {children}
      </ChallengeDateDispatchContext>
    </ChallengeDateContext.Provider>
  );
};

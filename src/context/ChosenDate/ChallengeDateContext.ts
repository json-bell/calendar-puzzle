import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ChallengeDate } from "./types";
import getChallengeDate from "./utils/getChallengeDate";

export const ChallengeDateContext = createContext<ChallengeDate>(
  getChallengeDate(new Date())
);

export const useChallengeDate = () => useContext(ChallengeDateContext);

type ChallengeDateDispatch = {
  setChallengeDate: Dispatch<SetStateAction<Date>>;
  incrementChallengeDate: (increment: number) => void;
};

export const ChallengeDateDispatchContext =
  createContext<ChallengeDateDispatch>({
    incrementChallengeDate: () => {
      console.error(
        "incrementChallengeDate was used with default context value"
      );
    },
    setChallengeDate: () => {
      console.error("setChallengeDate was used with default context value");
    },
  });

export const useChallengeDateDispatch = () =>
  useContext(ChallengeDateDispatchContext);

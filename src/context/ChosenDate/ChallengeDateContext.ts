import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ChallengeDate } from "./types";
import getChallengeDate from "./utils/getChallengeDate";

export const ChallengeDateContext = createContext<ChallengeDate>(
  getChallengeDate(new Date())
);

export const useChallengeDate = () => useContext(ChallengeDateContext);

export const ChallengeDateDispatchContext = createContext<
  Dispatch<SetStateAction<ChallengeDate>>
>(() => {
  console.info("Dispatch was used without initialising a value");
});

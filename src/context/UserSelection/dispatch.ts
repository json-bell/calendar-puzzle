import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserSelection } from "../../puzzle/types";

type SelectionDispatch = Dispatch<SetStateAction<UserSelection>>;

export const SelectionDispatchContext = createContext<{
  setUserSelection: SelectionDispatch;
}>({
  setUserSelection: () =>
    console.error("SelectionDispatchContext used with no provider :("),
});

const useSelectionDispatch = () => useContext(SelectionDispatchContext);

export default useSelectionDispatch;

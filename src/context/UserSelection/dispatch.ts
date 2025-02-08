import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserSelection } from "../../puzzle/types";

type SelectionDispatch = Dispatch<SetStateAction<UserSelection>>;

export const SelectionDispatchContext = createContext<SelectionDispatch>(
  () => {}
);

const useSelectionDispatch = () => useContext(SelectionDispatchContext);

export default useSelectionDispatch;

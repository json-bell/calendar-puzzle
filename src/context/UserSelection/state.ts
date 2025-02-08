import { createContext, useContext } from "react";
import { UserSelection } from "../../puzzle/types";

export const initialSelectionState: UserSelection = {
  selectedPiece: null,
  selectedPanel: null,
  rotation: null,
};
export const SelectionStateContext = createContext<UserSelection>(
  initialSelectionState
);

const useSelectionState = () => useContext(SelectionStateContext);

export default useSelectionState;

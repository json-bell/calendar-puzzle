import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserSelection } from "../../puzzle/types";

export const initialSelectionState: UserSelection = {
  selectedPiece: null,
  selectedCell: null,
  selectedPanel: null,
  rotation: null,
};

type SelectionDispatch = Dispatch<SetStateAction<UserSelection>>;

export const SelectionDispatchContext = createContext<{
  userSelection: UserSelection;
  setUserSelection: SelectionDispatch;
}>({
  userSelection: initialSelectionState,
  setUserSelection: () =>
    console.error("SelectionDispatchContext used with no provider :("),
});

const useUserSelection = () => useContext(SelectionDispatchContext);

export default useUserSelection;

import { ReactNode, useState } from "react";
import { UserSelection } from "../../puzzle/types";
import { initialSelectionState, SelectionStateContext } from "./state";
import { SelectionDispatchContext } from "./dispatch";

const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSelection, setUserSelection] = useState<UserSelection>(
    initialSelectionState
  );

  return (
    <SelectionStateContext.Provider value={userSelection}>
      <SelectionDispatchContext.Provider value={setUserSelection}>
        {children}
      </SelectionDispatchContext.Provider>
    </SelectionStateContext.Provider>
  );
};

export default SelectionProvider;

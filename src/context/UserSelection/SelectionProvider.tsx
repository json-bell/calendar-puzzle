import { ReactNode, useState } from "react";
import { UserSelection } from "../../puzzle/types";
import { initialSelectionState, SelectionDispatchContext } from "./dispatch";

const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSelection, setUserSelection] = useState<UserSelection>(
    initialSelectionState
  );

  return (
    <SelectionDispatchContext.Provider
      value={{ userSelection, setUserSelection }}
    >
      {children}
    </SelectionDispatchContext.Provider>
  );
};

export default SelectionProvider;

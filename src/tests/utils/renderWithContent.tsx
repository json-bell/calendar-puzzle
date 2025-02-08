import { render } from "@testing-library/react";
import SelectionProvider from "../../context/UserSelection/SelectionProvider";
import GameProvider from "../../context/Game/GameProvider";

const renderWithContext = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1]
) => {
  const renderedVal: ReturnType<typeof render> = render(
    <GameProvider>
      <SelectionProvider>{ui}</SelectionProvider>
    </GameProvider>,
    options
  );
  return renderedVal;
};

export default renderWithContext;

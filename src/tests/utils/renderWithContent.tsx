import { render } from "@testing-library/react";
import GameProvider from "../../context/Game/GameProvider";

const renderWithContext = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1]
) => {
  const renderedVal: ReturnType<typeof render> = render(
    <GameProvider>{ui}</GameProvider>,
    options
  );
  return renderedVal;
};

export default renderWithContext;

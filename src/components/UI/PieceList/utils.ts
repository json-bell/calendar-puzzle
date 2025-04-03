import { WindowSize } from "../../../utils/useWindowSize/types";

export const pieceListLayoutLookup: Record<
  WindowSize,
  "horizontal" | "vertical"
> = {
  large: "vertical",
  medium: "horizontal",
  small: "vertical",
  compact: "horizontal",
};

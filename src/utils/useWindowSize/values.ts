import { WindowSize } from "./types";

export const lowerBreakpoints: Record<
  Exclude<WindowSize, "compact">,
  number
> = {
  large: 1140,
  medium: 832,
  small: 584,
};

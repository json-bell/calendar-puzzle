import { WindowSize } from "./types";

export const panelSizeGlobal: { [K in WindowSize]: number } = {
  large: 80,
  medium: 60,
  small: 48,
  compact: 48,
};

export const lowerBreakpoints: Record<
  Exclude<WindowSize, "compact">,
  number
> = {
  large: 1140,
  medium: 832,
  small: 584,
};

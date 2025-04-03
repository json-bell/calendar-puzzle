import { ViewportLookup } from "../utils/useWindowSize/types";

export const panelSizeByViewport: ViewportLookup<number> = {
  large: 80,
  medium: 80,
  small: 48,
  compact: 32,
};

export const panelBorderByViewport: ViewportLookup<number> = {
  large: 4,
  medium: 4,
  small: 2,
  compact: 2,
};

export const panelFontSizeByViewport: ViewportLookup<number> = {
  // in Em
  large: 1.6,
  medium: 1.6,
  small: 1,
  compact: 0.75,
};

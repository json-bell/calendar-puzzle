import { ViewportLookup } from "../utils/useWindowSize/types";

export const panelSizeByViewport: ViewportLookup<number> = {
  large: 80,
  medium: 80,
  small: 40,
  compact: 32,
};

export const panelBorderByViewport: ViewportLookup<number> = {
  large: 4,
  medium: 4,
  small: 2,
  compact: 2,
};

export const boardWrapperByViewport: ViewportLookup<number> = {
  large: 16,
  medium: 16,
  small: 8,
  compact: 8,
};

export const panelFontSizeByViewport: ViewportLookup<number> = {
  // in Em
  large: 1.6,
  medium: 1.6,
  small: 0.8,
  compact: 0.64,
};

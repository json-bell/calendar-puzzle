import { CSSProperties } from "react";
import { WindowSize } from "../utils/useWindowSize/types";
import {
  panelFontSizeByViewport,
  panelBorderByViewport,
  panelSizeByViewport,
} from "./sizesByViewport";

export const getGlobalSizeVariables = (viewport: WindowSize) => {
  return {
    panelSize: panelSizeByViewport[viewport],
    panelBorder: panelBorderByViewport[viewport],
    fontSize: panelFontSizeByViewport[viewport],
  };
};

const globalSizeVariables = (sizeKey: WindowSize) => {
  const { panelSize, panelBorder, fontSize } = getGlobalSizeVariables(sizeKey);

  return {
    "--panel-size": `${panelSize}px`,
    "--panel-border": `${panelBorder}px`,
    "--panel-font-size": `${fontSize}em`,
  };
};

const colourVariables = {
  "--wall-color": "rgb(0, 91, 91)",
  "--cell-color": "brown",
  "--cell-color-hovered": "green",
  "--cell-color-selected-piece": "red",
  "--cell-color-selected": "orange",
  "--cell-color-selected-placed": "purple",
  "--piece-color-preview": "yellow",
  "--piece-color-placed": "white",
  "--piece-color-selected-placed": "black",
  "--panel-color": "#321",
  "--panel-color-previewed": "grey",
};

const zIndices = {
  "--z-index-piece-preview": 100,
};

export const globalCSSVariables: (opts: {
  sizeKey: WindowSize;
}) => CSSProperties = ({ sizeKey }) =>
  ({
    ...globalSizeVariables(sizeKey),
    ...colourVariables,
    ...zIndices,
  } as CSSProperties);

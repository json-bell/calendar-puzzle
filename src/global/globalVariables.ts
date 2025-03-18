import { CSSProperties } from "react";
import { WindowSize } from "../utils/useWindowSize/types";
import { panelSizeLookup } from "../utils/useWindowSize/values";

export const getGlobalSizeVariables = (viewport: WindowSize) => {
  return { panelSize: panelSizeLookup[viewport] };
};

const globalSizeVariables = (sizeKey: WindowSize) => {
  const { panelSize } = getGlobalSizeVariables(sizeKey);

  return {
    "--panel-size": `${panelSize}px`,
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

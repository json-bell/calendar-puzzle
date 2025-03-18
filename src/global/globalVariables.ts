import { CSSProperties } from "react";
import { WindowSize } from "../utils/useWindowSize/types";
import { panelSizeGlobal } from "../utils/useWindowSize/values";

const sizeVariables = (sizeKey: WindowSize) => ({
  "--panel-size": `${panelSizeGlobal[sizeKey]}px`,
});

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
    ...sizeVariables(sizeKey),
    ...colourVariables,
    ...zIndices,
  } as CSSProperties);

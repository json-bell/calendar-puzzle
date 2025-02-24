import { CSSProperties } from "react";

export const panelSizeGlobal = 80;

const sizeVariables = {
  "--panel-size": `${panelSizeGlobal}px`,
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

export const globalCSSVariables = {
  ...sizeVariables,
  ...colourVariables,
  ...zIndices,
} as CSSProperties;

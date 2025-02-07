import { CSSProperties } from "react";

export const panelSizeGlobal = 80;

const sizeVariables = {
  "--panel-size": `${panelSizeGlobal}px`,
};

const colourVariables = {
  "--wall-color": `rgb(0, 91, 91)`,
  "--cell-color": `brown`,
};

export const globalCSSVariables = {
  ...sizeVariables,
  ...colourVariables,
} as CSSProperties;

import { CSSProperties } from "react";
import { WindowSize } from "../utils/useWindowSize/types";
import {
  panelFontSizeByViewport,
  panelBorderByViewport,
  panelSizeByViewport,
  boardWrapperByViewport,
} from "./sizesByViewport";

export const getGlobalSizeVariables = (viewport: WindowSize) => {
  return {
    panelSize: panelSizeByViewport[viewport],
    panelBorder: panelBorderByViewport[viewport],
    fontSize: panelFontSizeByViewport[viewport],
    boardWrapper: boardWrapperByViewport[viewport],
  };
};

const globalSizeVariables = (sizeKey: WindowSize) => {
  const { panelSize, panelBorder, fontSize, boardWrapper } =
    getGlobalSizeVariables(sizeKey);

  return {
    "--panel-size": `${panelSize}px`,
    "--panel-border": `${panelBorder}px`,
    "--panel-font-size": `${fontSize}em`,
    "--board-wrapper-thickness": `${boardWrapper}`,
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
  "--panel-color": "#222",
  "--panel-challenge-background":
    "radial-gradient(ellipse 60% 50% at 50% 50%, #aaa 0%, #999 50%, var(--panel-color) 110%)",
  "--font-challenge-color": "#222",
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

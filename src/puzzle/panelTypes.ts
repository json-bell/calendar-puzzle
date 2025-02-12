import { DayName, DayNumber, Month } from "./boardPanels/dateData";
import { CellType } from "./pieceTypes";

export type PanelDateType =
  | "dayNumber"
  | "month"
  | "dayName"
  | "empty"
  | "wall";
export type PanelContent = DayNumber | DayName | Month | "empty" | "wall";

export type Panel = {
  type: PanelDateType;
  content: PanelContent;
  contentIndex: number;
  panelX: number;
  panelY: number;
};

export type PanelStatus = "free" | "covered" | "wall";

export type PanelDetails = {
  panel: Panel;
  state: PanelStatus;
} & (
  | { state: "covered"; coveredBy: CellType }
  | { state: "free" | "wall"; coveredBy?: never }
);

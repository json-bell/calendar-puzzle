export type PanelType = "dayNumber" | "month" | "dayName" | "empty" | "wall";
export type PanelContent = DayNumber | DayName | Month | "empty" | "wall";
export type PanelContentArray = Readonly<PanelContent[]>;

export type Panel = {
  type: PanelType;
  content: PanelContent;
  contentIndex: number;
};

export const dayNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
export type DayNumber = (typeof dayNumbers)[number];

export const dayNames = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;
export type DayName = (typeof dayNames)[number];

export const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;
export type Month = (typeof months)[number];

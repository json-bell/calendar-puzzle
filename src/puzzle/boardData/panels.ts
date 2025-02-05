type TileType = "dayNumber" | "month" | "dayName" | "empty" | "blocked";

export const dayNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
export type DayNumbers = (typeof dayNumbers)[number];

export const dayNames = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;
export type DayNames = (typeof dayNames)[number];

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
export type Months = (typeof months)[number];

const rawSetupData = [
  ["jan", "feb", "mar", "apr", "1", "2", "3", "mon", "tue"],
  ["may", "4", "5", "6", "7", "8", "9", "wed", "empty"],
  ["jun", "10", "11", "12", "13", "31", "15", "thu", "empty"],
  ["jul", "16", "17", "18", "19", "20", "21", "fri", "sat"],
  ["aug", "22", "23", "24", "25", "26", "27", "empty", "sun"],
  ["sep", "oct", "nov", "dec", "28", "29", "30", "14", "blocked"],
];

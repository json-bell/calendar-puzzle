import {
  dayNames,
  dayNumbers,
  months,
  Panel,
  PanelContent,
  PanelContentArray,
  PanelType,
} from "./panels";
import fs from "fs";

const rawSetupData: PanelContent[][] = [
  ["jan", "feb", "mar", "apr", 1, 2, 3, "mon", "tue"],
  ["may", 4, 5, 6, 7, 8, 9, "wed", "empty"],
  ["jun", 10, 11, 12, 13, 31, 15, "thu", "empty"],
  ["jul", 16, 17, 18, 19, 20, 21, "fri", "sat"],
  ["aug", 22, 23, 24, 25, 26, 27, "empty", "sun"],
  ["sep", "oct", "nov", "dec", 28, 29, 30, 14, "wall"],
];

const panelTypeLookup: Record<PanelType, PanelContentArray> = {
  dayName: dayNames,
  dayNumber: dayNumbers,
  month: months,
  empty: ["empty"],
  wall: ["wall"],
};

const getPanelTypeFromContent = (content: PanelContent): PanelType => {
  for (const [panelType, array] of Object.entries(panelTypeLookup)) {
    if (array.includes(content)) return panelType as PanelType;
  }
  throw new Error(
    `Failed to decide the following panel content's type: ${content}`
  );
};

/** Key function of the file that generates the individual panels
 *
 * @param content
 * @returns an individual `Panel` object
 */
const generatePanelFromContent = (content: PanelContent): Panel => {
  const type = getPanelTypeFromContent(content);
  return {
    type,
    content,
    contentIndex: panelTypeLookup[type].indexOf(content),
  };
};

const getBoardPanels = (rawData: PanelContent[][]): Panel[][] => {
  return rawData.map((row) => row.map(generatePanelFromContent));
};

const filePath = "./src/puzzle/boardData/boardPanels.ts";
const boardPanelString = JSON.stringify(getBoardPanels(rawSetupData), null, 2)
  .replace(/\n\s{6}/g, " ")
  .replace(/\n\s{4}\}/g, " }");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-panels\` to re-generate the file.

import { Panel } from "./panels";

const boardPanels: Panel[][] = ${boardPanelString};
  
  export default boardPanels;`,
  (err) => {
    if (err) console.error("Error generating Board Panels:", err);
    else {
      console.log("Successfully generated Board Panels to", filePath);
    }
  }
);

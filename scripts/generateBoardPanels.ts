import {
  getBoardPanels,
  rawSetupData,
} from "../src/puzzle/boardPanels/getBoardPanels";
import fs from "fs";

const filePath = "./src/puzzle/boardPanels/index.ts";
const boardPanelString = JSON.stringify(getBoardPanels(rawSetupData), null, 2)
  .replace(/\n\s{6}/g, " ")
  .replace(/\n\s{4}\}/g, " }");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-panels\` to re-generate the file.

import { Panel } from "../panelTypes";

const boardPanels: Panel[][] = ${boardPanelString};
  
  export default boardPanels;`,
  (err) => {
    if (err) console.error("Error generating Board Panels:", err);
    else {
      console.log("Successfully generated Board Panels to", filePath);
    }
  }
);

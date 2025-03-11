import fs from "fs";
import rawPieceData from "../src/puzzle/puzzlePieces/rawPieceData";
import getPieceBorderLookup from "../src/puzzle/pieceBorderLookup/getPieceBorderLookup";

const filePath = "./src/puzzle/pieceBorderLookup/index.ts";
const borderLookupString = JSON.stringify(
  getPieceBorderLookup(rawPieceData),
  null,
  2
)
  .replace(/\n\s{8}/g, " ")
  .replace(/\n\s{6}\}/g, " }")
  .replace(/true/g, " true")
  .replace(/"/g, "");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-borders\` to re-generate the file.

import { PiecesBorderLookup } from "./types";

const pieceBorderLookup: PiecesBorderLookup = ${borderLookupString};
  
  export default pieceBorderLookup;`,
  (err) => {
    if (err) console.error("Error generating Board Panels:", err);
    else {
      console.log("Successfully generated Board Panels to", filePath);
    }
  }
);

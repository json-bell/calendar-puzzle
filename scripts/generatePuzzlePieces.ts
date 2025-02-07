import fs from "fs";
import { getPuzzlePieces } from "../src/puzzle/puzzlePieces/getPuzzlePieces";
import { rawPuzzlePieces } from "../src/puzzle/puzzlePieces/rawData";

const filePath = "./src/puzzle/puzzlePieces/index.ts";
const puzzlePieceString = JSON.stringify(
  getPuzzlePieces(rawPuzzlePieces),
  null,
  2
)
  .replace(/\n\s{8}/g, " ")
  .replace(/\n\s{6}\]/g, " ]");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-panels\` to re-generate the file.

import { PuzzlePieceType } from "./getPuzzlePieces";

const puzzlePieces: PuzzlePieceType[] = ${puzzlePieceString};
  
  export default puzzlePieces;`,
  (err) => {
    if (err) console.error("Error generating Board Panels:", err);
    else {
      console.log("Successfully generated Board Panels to", filePath);
    }
  }
);

import fs from "fs";
import { getPuzzlePieces } from "../src/puzzle/puzzlePieces/getPuzzlePieces";
import rawPieceData from "../src/puzzle/puzzlePieces/rawPieceData";

const filePath = "./src/puzzle/puzzlePieces/index.ts";
const puzzlePieceString = JSON.stringify(getPuzzlePieces(rawPieceData), null, 2)
  .replace(/\n\s{8}/g, " ")
  .replace(/\n\s{6}\]/g, " ]");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-pieces\` to re-generate the file.

import { Piece } from "../pieceTypes";

const puzzlePieces: Piece[] = ${puzzlePieceString};
  
  export default puzzlePieces;`,
  (err) => {
    if (err) console.error("Error generating Board Panels:", err);
    else {
      console.info("Successfully generated Board Panels to", filePath);
    }
  }
);

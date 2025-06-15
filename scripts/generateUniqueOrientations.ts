import fs from "fs";
import getUniquePieceOrientations from "../src/puzzle/rotations/getUniquePieceOrientations";

const filePath = "./src/puzzle/rotations/uniqueOrientations.ts";
const orientationString = JSON.stringify(getUniquePieceOrientations(), null, 2)
  .replace(/\n\s{4}/g, " ")
  .replace(/\n\s{2}\}/g, " }")
  .replace(/"/g, "");

fs.writeFile(
  filePath,
  `// This is a script generated file - do not edit. Run \`yarn generate-orientations\` to re-generate the file.

import { UniqueOrientation } from "./types";

const uniqueOrientations: UniqueOrientation[] = ${orientationString};
  
  export default uniqueOrientations;`,
  (err) => {
    if (err) console.error("Error generating Piece Orientations:", err);
    else {
      console.info("Successfully generated Piece Orientations to", filePath);
    }
  }
);

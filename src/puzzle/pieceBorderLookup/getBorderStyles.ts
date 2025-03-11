import { CSSProperties } from "react";
import getPlacedPieceColour from "../../components/Game/Cell/getPlacedPieceColour";
import getProcessedBorders from "./getProcessedBorders";
import { BorderProcessingArgs } from "./types";

const getBorderStyles = (args: BorderProcessingArgs): CSSProperties => {
  const { pieceId } = args;
  const borders = getProcessedBorders(args);

  return {
    borderColor: getPlacedPieceColour(pieceId),
    borderWidth: "2px",
    borderRadius: borders.cornerRadii
      .map((bool) => (bool ? "4px" : "0px"))
      .join(" "),
    borderLeftStyle: borders.left ? "solid" : "none",
    borderRightStyle: borders.right ? "solid" : "none",
    borderTopStyle: borders.top ? "solid" : "none",
    borderBottomStyle: borders.bottom ? "solid" : "none",
  };
};

export default getBorderStyles;

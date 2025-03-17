import { CSSProperties } from "react";
import getPlacedPieceColour from "../../components/Game/Cell/getPlacedPieceColour";
import getProcessedBorders from "./getProcessedBorders";
import { BorderProcessingArgs } from "./types";

const getBorderStyles = (args: BorderProcessingArgs): CSSProperties => {
  const { pieceId } = args;
  const borders = getProcessedBorders(args);

  return {
    borderColor: args.isSelected ? "white" : getPlacedPieceColour(pieceId),
    borderRadius: borders.cornerRadii
      .map((bool) => (bool ? "4px" : "0px"))
      .join(" "),

    // undefined borderStyle inherits from CSS
    borderLeftStyle: borders.left ? undefined : "none",
    borderRightStyle: borders.right ? undefined : "none",
    borderTopStyle: borders.top ? undefined : "none",
    borderBottomStyle: borders.bottom ? undefined : "none",
  };
};

export default getBorderStyles;

const getPlacedPieceColour = (
  pieceId: number,
  {
    saturation = 100,
    lightness = 50,
  }: { saturation?: number; lightness?: number } = {}
): string => `hsl(${36 * pieceId}, ${saturation}%, ${lightness}%)`;

export default getPlacedPieceColour;

const getPlacedPieceColour = (pieceId: number): string =>
  `hsl(${36 * pieceId}, 100%, 50%)`;

export default getPlacedPieceColour;

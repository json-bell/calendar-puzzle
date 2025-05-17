type FullWinDetails = {
  isWin: boolean;
  flippedPieceCount: number;
  // hintCount: number; // direct hints that place the piece
  // completionCheckCount: number; // indirect hints that check solutions are still possible
};

export type WinDetails =
  | ({ isWin: false } & Partial<FullWinDetails>)
  | ({ isWin: true } & FullWinDetails);

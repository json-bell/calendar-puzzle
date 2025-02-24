import { BoardShape } from "../../types";

const mapBoard = <Input, Output>(
  board: BoardShape<Input>,
  mappingFn: (input: Input, rowIndex: number, colIndex: number) => Output
): BoardShape<Output> => {
  return board.map((row, rowIndex) =>
    row.map((element, colIndex) => mappingFn(element, colIndex, rowIndex))
  ) as BoardShape<Output>;
};

export default mapBoard;

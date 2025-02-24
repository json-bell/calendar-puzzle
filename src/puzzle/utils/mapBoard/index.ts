import { BoardShape } from "../../types";

export type BoardMapperFn<Input, Output> = (
  input: Input,
  rowIndex: number,
  colIndex: number
) => Output;

const mapBoard = <Input, Output>(
  board: BoardShape<Input>,
  mappingFn: BoardMapperFn<Input, Output>
): BoardShape<Output> => {
  return board.map((row, rowIndex) =>
    row.map((element, colIndex) => mappingFn(element, colIndex, rowIndex))
  ) as BoardShape<Output>;
};

export default mapBoard;

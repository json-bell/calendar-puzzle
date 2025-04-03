import { useEffect, useState } from "react";
import useInnerWidth from "../useInnerWidth/useInnerWidth";
import { WindowSize } from "./types";
import { lowerBreakpoints } from "./values";

const getWindowSize = (width: number): WindowSize => {
  const { large, medium, small } = lowerBreakpoints;

  if (width >= large) return "large";
  if (width >= medium) return "medium";
  if (width >= small) return "small";
  return "compact";
};

const useWindowSize = (): WindowSize => {
  const width = useInnerWidth();

  const [windowSize, setWindowSize] = useState<WindowSize>("large");

  useEffect(() => {
    setWindowSize((currSize) => {
      const newSize = getWindowSize(width);
      return newSize === currSize ? currSize : newSize;
    });
  }, [width]);

  return windowSize;
};

export default useWindowSize;

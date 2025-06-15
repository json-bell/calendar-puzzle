import { CSSProperties } from "react";
import { ToastInfo } from "./types";

const parseToasterOpacity = ({ opacity }: ToastInfo): CSSProperties => {
  const { value, ease, fadeMs } = opacity || {};
  const parsedEase =
    typeof ease === "string" ? ease : `cubic-bezier(${ease.join(", ")})`;
  return { opacity: value, transition: `opacity ${fadeMs}ms ${parsedEase}` };
};
export default parseToasterOpacity;

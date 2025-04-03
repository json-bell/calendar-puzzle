import { createContext, useContext } from "react";
import { WindowSize } from "./types";

export const ViewportContext = createContext<WindowSize>("large");

export const useViewport = () => useContext(ViewportContext);

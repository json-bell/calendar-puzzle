import { createContext } from "react";
import { ToasterQueue } from "./types";

const ToasterContext = createContext<ToasterQueue>({
  toasts: {},
  fadeToast: () => {
    console.error("Toaster used without Context :(");
  },
  updateToast: () => {
    console.error("Toaster used without Context :(");
  },
  defineToast: () => {
    console.error("Toaster used without Context :(");
  },
});

export default ToasterContext;

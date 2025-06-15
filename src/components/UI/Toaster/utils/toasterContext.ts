import { createContext } from "react";
import { ToasterQueue } from "./types";

const ToasterContext = createContext<ToasterQueue>({
  toasts: {},
  fadeToast: () => {
    console.log("Toaster used without Context :(");
  },
  updateToast: () => {
    console.log("Toaster used without Context :(");
  },
});

export default ToasterContext;

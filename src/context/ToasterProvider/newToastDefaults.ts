import { ToastInfo } from "../../components/UI/Toaster/utils/types";

export const newToastDefaults: Omit<ToastInfo, "id"> = {
  contents: null,
  opacity: {
    value: 1,
    ease: "linear",
    fadeMs: 1000,
  },
  pendingLifecycles: [],
};

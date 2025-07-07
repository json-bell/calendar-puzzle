import { useMemo } from "react";
import { useToasterQueue } from "./useToasterQueue";
import { ToastControls } from "./types";
// import { ToastLifecycle, ToastLifecycleInstance } from "./toastLifecycle";

// type Options = {
// lifeOnUpdate: InstanceType<typeof ToastLifecycle> | null;
// };

const useToast = (
  id: string
  // options?: {
  //   lifeOnUpdate?: ToastLifecycleInstance | null;
  // }
): ToastControls => {
  const { toasts, updateToast, fadeToast, defineToast } = useToasterQueue();
  // const {}: Options = { ...options };

  const toastExists = !!toasts[id];

  return useMemo((): ToastControls => {
    const define: ToastControls["define"] = (toast) => {
      defineToast(id, toast);
    };

    const update: ToastControls["update"] = (updates) => {
      updateToast(id, { ...updates });
    };

    const close: ToastControls["close"] = (eatingOptions) => {
      update({ hoverPauses: false });
      fadeToast(id, { fadeMs: 500, ...eatingOptions });
    };

    const fade: ToastControls["fade"] = (eatingOptions) => {
      update({ hoverPauses: true });
      fadeToast(id, { ...eatingOptions });
    };

    const forceClose: ToastControls["forceClose"] = (eatingOptions) => {
      update({ hoverPauses: false });
      fadeToast(id, { fadeMs: 0, ...eatingOptions });
    };

    const get: ToastControls["get"] = () => toasts[id];

    return { define, update, get, close, fade, forceClose };
  }, [id, updateToast, fadeToast, toastExists, defineToast]);
};

export default useToast;

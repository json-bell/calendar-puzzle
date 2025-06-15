import { ReactNode, useState } from "react";
import ToasterContext from "../../components/UI/Toaster/utils/toasterContext";
import {
  ToasterQueue,
  ToastInfo,
  ToastList,
} from "../../components/UI/Toaster/utils/types";
import {
  delay,
  ToastLifecycle,
} from "../../components/UI/Toaster/utils/toastLifecycle";

const newToastDefaults: Omit<ToastInfo, "id"> = {
  contents: null,
  opacity: {
    value: 1,
    ease: "linear",
    fadeMs: 1000,
  },
};

const ToasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToasterQueue["toasts"]>({});

  const updateToast: ToasterQueue["updateToast"] = (id, updates) => {
    setToasts((currToasts): ToastList => {
      const specifiedToast = currToasts[id];
      return {
        ...currToasts,
        [id]: { ...newToastDefaults, ...specifiedToast, ...updates, id },
      };
    });
  };

  const fadeToast: ToasterQueue["fadeToast"] = (id, options) => {
    const { fadeMs = 1000, ease = "linear" } = options || {};

    const closingLifecycle = new ToastLifecycle(async ({ stopped }) => {
      if (fadeMs) {
        updateToast(id, { opacity: { value: 0, fadeMs, ease } });
        await delay(fadeMs);
      }
      if (stopped) return null;

      return "eat";
    });

    setToasts((currToasts) => {
      const specifiedToast = currToasts[id];
      if (!specifiedToast) return currToasts;

      return {
        ...currToasts,
        [id]: {
          ...specifiedToast,
          opacity: { value: 0, fadeMs, ease },
          pendingLifecycles: [closingLifecycle],
        },
      };
    });
  };

  return (
    <ToasterContext.Provider value={{ toasts, fadeToast, updateToast }}>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;

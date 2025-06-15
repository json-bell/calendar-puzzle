import { ReactNode, useMemo, useState } from "react";
import ToasterContext from "../../components/UI/Toaster/utils/toasterContext";
import {
  ToasterQueue,
  ToastList,
} from "../../components/UI/Toaster/utils/types";
import {
  delay,
  ToastLifecycle,
} from "../../components/UI/Toaster/utils/toastLifecycle";
import { newToastDefaults } from "./newToastDefaults";

const ToasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToasterQueue["toasts"]>({});

  const { defineToast, updateToast, fadeToast } = useMemo(() => {
    console.log("reloading provider");
    const defineToast: ToasterQueue["defineToast"] = (id, toast) => {
      setToasts((currToasts): ToastList => {
        return {
          ...currToasts,
          [id]: { ...toast, id },
        };
      });
    };

    const updateToast: ToasterQueue["updateToast"] = (id, updates) => {
      setToasts((currToasts): ToastList => {
        const specifiedToast = currToasts[id];
        if (!specifiedToast)
          console.warn(
            "Updating unset toast, you may wish to use `toast.set` instead"
          );
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
    return { defineToast, updateToast, fadeToast };
  }, [setToasts]);

  return (
    <ToasterContext.Provider
      value={{ toasts, fadeToast, defineToast, updateToast }}
    >
      {children}
    </ToasterContext.Provider>
  );
};

export default ToasterProvider;

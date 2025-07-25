import { useEffect } from "react";
import styles from "./Toaster.module.css";
import parseToasterOpacity from "./utils/parseToasterOpacity";
import type { ToastInfo } from "./utils/types";
import useToast from "./utils/useToast";

type ToastProps = {
  toast: ToastInfo;
};

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const {
    close: handleClose,
    update: handleUpdate,
    // fade: handleFade,
    // forceClose: handleForceClose,
  } = useToast(toast.id);

  const { pendingLifecycles } = toast;

  useEffect(() => {
    const promises = pendingLifecycles.map((lifecycle) => lifecycle.promise);
    const allSettled = Promise.allSettled(promises);

    allSettled
      .then((resolutions) =>
        resolutions
          .filter((resolution) => {
            if (resolution.status === "rejected")
              console.error(resolution.reason);
            return resolution.status === "fulfilled";
          })
          .map(({ value }) => value)
      )
      .then((results) => {
        if (results.every((result) => result === "eat")) {
          handleUpdate({ eaten: true });
        }
      });
  }, [pendingLifecycles, handleUpdate]);

  if (toast.eaten === true) return null;

  const onClose = () => {
    handleClose();
  };

  // const onHover = () => {
  //   handleSet({});
  // };

  const opacityStyles = parseToasterOpacity(toast);

  return (
    <div className={styles.toastWrapper} style={opacityStyles}>
      {toast.contents}
      <button className={styles.closeButton} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M20 20L4 4M4 20L20 4M20 20Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;

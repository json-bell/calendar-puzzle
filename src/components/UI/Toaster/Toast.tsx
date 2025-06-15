import { useEffect } from "react";
import ControlButton from "../ControlButtons/ControlButton";
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
          .filter((resolution) => resolution.status === "fulfilled")
          .map(({ value }) => value)
      )
      .then((results) => {
        if (results.every((result) => result === "eat" || result === null)) {
          handleUpdate({ eaten: true });
        }
      });
  }, [pendingLifecycles]);

  if (toast.eaten === true) return null;

  const onClose = () => {
    handleClose();
  };

  // const onHover = () => {
  //   handleSet({});
  // };

  const opacityStyles = parseToasterOpacity(toast);

  return (
    <div
      className={styles.toastWrapper}
      // onMouseOver={onHover}
      style={opacityStyles}
    >
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
      <ControlButton onClick={onClose}>Eat Toast</ControlButton>
    </div>
  );
};

export default Toast;

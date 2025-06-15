import { useEffect } from "react";
import ControlButton from "../ControlButtons/ControlButton";
import styles from "./Toaster.module.css";
import parseToasterOpacity from "./utils/parseToasterOpacity";
import { ToastInfo } from "./utils/types";
import useToast from "./utils/useToast";

type ToastProps = {
  toast: ToastInfo;
};

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const {
    close: handleClose,
    // set: handleSet,
    // fade: handleFade,
    // forceClose: handleForceClose,
  } = useToast(toast.id);

  const { pendingLifecycles } = toast;

  const promises = pendingLifecycles?.map((lifecycle) => lifecycle.promise);
  console.log(promises?.length);
  useEffect(() => {
    console.log("new promises");
    promises?.[0].then(() => {
      console.log("done");
    });
  }, [promises]);

  if (!promises?.length) return null;
  const lifecycleResolutions = Promise.all(promises);

  lifecycleResolutions.then((results) => {
    console.log("SUCCESS - checking if all eaten");
    if (results.every((result) => result === "eat" || result === null)) {
      console.log("dead");
    }
  });

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

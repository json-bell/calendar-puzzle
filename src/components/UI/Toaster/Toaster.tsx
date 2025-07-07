import Toast from "./Toast";
import styles from "./Toaster.module.css";
import { useToasterQueue } from "./utils/useToasterQueue";

type ToasterProps = {
  _?: never;
};

const Toaster: React.FC<ToasterProps> = () => {
  const { toasts } = useToasterQueue();

  return (
    <div className={styles.toasterWrapper}>
      {Object.entries(toasts).map(([key, toast]) => {
        if (!toast) return;

        return <Toast key={key} toast={toast} />;
      })}
    </div>
  );
};

export default Toaster;

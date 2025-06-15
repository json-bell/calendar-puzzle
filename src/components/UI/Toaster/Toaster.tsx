import Toast from "./Toast";
import styles from "./Toaster.module.css";
import { useToasterQueue } from "./utils/useToasterQueue";

type ToasterProps = {
  _?: never;
};

const Toaster: React.FC<ToasterProps> = () => {
  const { toasts } = useToasterQueue();

  return (
    <div
      className={styles.toasterWrapper}
      style={{
        border: "#fab7 5px solid",
        padding: "20px",
        borderRadius: "10px",
        outline: "green solid 5px",
      }}
    >
      <div style={{ backgroundColor: "brown", padding: "8px" }}>
        start child
      </div>
      {Object.entries(toasts).map(([key, toast]) => {
        if (!toast) return;

        return <Toast key={key} toast={toast} />;
      })}
      <div style={{ backgroundColor: "blue", height: "100px" }}>Toaster!</div>
    </div>
  );
};

export default Toaster;

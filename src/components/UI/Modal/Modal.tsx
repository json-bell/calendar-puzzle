import { ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = { children: ReactNode; isOpen: boolean; onClose: () => void };

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return isOpen ? (
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.modalWrapper}>{children}</div>
    </div>
  ) : null;
};

export default Modal;

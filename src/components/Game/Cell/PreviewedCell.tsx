import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

const PreviewedCell: React.FC = () => (
  <div className={cx(styles.generalCell, styles.previewedCell)} />
);
export default PreviewedCell;

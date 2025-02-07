import cx from "../../../utils/concatClassNames/concatClassNames";
import styles from "./Cell.module.css";

const EmptyCell: React.FC = () => (
  <div className={cx(styles.generalCell, styles.emptyCell)} />
);
export default EmptyCell;

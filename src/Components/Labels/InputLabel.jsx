
import styles from './label.module.css';

const InputLabel = ({ text,forHtml="",size="sm" }) => {
  return (
    <label forHtml={forHtml} className={`${styles.input_label} ${styles[size]}`}>
      {text}
    </label>
  );
}

export default InputLabel;

import styles from './button.module.css';

const PrimaryButton = ({ full=true,size="md",onClick,children }) => {
  const onButtonClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <button className={`${styles.btn} ${styles.btn_primary} ${full ? styles.btn_full : ""} ${styles[size]}`} onClick={onButtonClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
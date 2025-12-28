
import styles from './button.module.css';

const SecondaryButton = ({ action,full=true,size="md",onClick,children }) => {
  const onButtonClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <button data-action={action} className={`${styles.btn} ${styles.btn_secondary} ${full ? styles.btn_full : ""} ${styles[size]}`} onClick={onButtonClick}>
      {children}
    </button>
  );
}

export default SecondaryButton;
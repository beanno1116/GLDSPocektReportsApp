
import styles from './button.module.css';

const OutlineButton = ({ action,onClick,type,size="md",children,full=true,...props }) => {
  const onButtonClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <button data-action={action} className={`${styles.btn} ${styles.btn_outline} ${type && styles[type]} ${full ? styles.btn_full : ""} ${styles[size]}`} onClick={onButtonClick}>
      {children}
    </button>
  );
}

export default OutlineButton;
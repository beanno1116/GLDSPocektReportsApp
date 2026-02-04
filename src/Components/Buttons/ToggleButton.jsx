
import styles from './button.module.css';

const ToggleButton = ({ action,active=false,onClick,size="md",children,full=true,...props }) => {
  const onButtonClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <button data-action={action} className={`${styles.btn} ${styles.toggle_btn} ${active ? styles.active : ""} ${full ? styles.btn_full : ""} ${styles[size]}`} onClick={onButtonClick}>
      {children}
    </button>
  );
}

export default ToggleButton;
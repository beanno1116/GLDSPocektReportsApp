
import styles from './button.module.css';

const IconButton = ({ onClick,action="default",children }) => {

  const onButtonClick = (e) => {
    onClick && onClick(e,action);
  }

  return (
    <button data-action={action} className={styles.icon_button} onClick={onButtonClick}>
       {children}
    </button>
  );
}

export default IconButton;
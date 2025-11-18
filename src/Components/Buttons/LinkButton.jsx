
import styles from './button.module.css';

const LinkButton = ({ onClick,children }) => {
  const onButtonClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <button type='button' className={styles.link_button} onClick={onButtonClick}>
       {children}
    </button>
  );
}

export default LinkButton;

import styles from '../menuGrid.module.css';

const MenuGridButton = ({ action,onClick,children }) => {

  const onButtonClick = (e) => {
    onClick && onClick(e,action);
  }

  return (
    <button data-action={action} className={styles.menu_grid_button} onClick={onButtonClick}>
       {children}
    </button>
  );
}

export default MenuGridButton;
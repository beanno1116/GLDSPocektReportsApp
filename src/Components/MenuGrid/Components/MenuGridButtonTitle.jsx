
import styles from '../menuGrid.module.css';

const MenuGridButtonTitle = ({ children }) => {
  return (
    <span className={styles.menu_grid_button_title} style={{color:"snow"}}>
      {children}
    </span>
  );
}

export default MenuGridButtonTitle;
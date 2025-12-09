
import styles from '../menuGrid.module.css';

const MenuGridRow = ({ children }) => {
  return (
    <div className={styles.menu_grid_row}>
      {children}
    </div>
  );
}

export default MenuGridRow;
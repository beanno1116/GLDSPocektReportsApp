import styles from '../weSelect.module.css';


/**
 * 
 * @param {Function} onClick 
 * @param {React.children} children 
 * @returns returns an add button row component
 */
const NavMenuOption = ({ onClick, children }) => {
  return (
    <div className={`${styles.add_item}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default NavMenuOption;
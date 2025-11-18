
import styles from './button.module.css';

const NavButton = ({ disabled=false,theme="light",active=false,action,onClick,color="",size="md",children }) => {

  const onButtonClick = (e) => {
    onClick && onClick(e,action)
  }

  return (
    <button disabled={disabled} data-button="nav" data-action={action} style={{color:color}} onClick={onButtonClick} className={`${styles.nav_button} ${styles[size]} ${active ? styles.active : ""} ${styles[theme]}`}>
       {children}
    </button>
  );
}

export default NavButton;
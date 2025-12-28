
import styles from '../view.module.css';

const NavButtonIcon = ({children}) => {
  return (
    <div className={styles.nav_icon}>{children}</div>   
  )
}

const NavButtonLabel = ({children}) => {
  return (
    <div className={styles.nav_label}>{children}</div>
  )
}

const NavButton = ({icon,label,action,onClick,children}) => {

  const onButtonClick = (e) => {
    onClick && onClick(e);
  }

  return (
    <button data-action="reports" className={`${styles.nav_item} ${styles.active}`} onClick={onButtonClick}>          
      <div className={styles.nav_icon}>{icon}</div>          
      <div className={styles.nav_label}>{label}</div>
    </button>
  )
}



const BottomNav = ({ fixed=true,children }) => {
  return (
    <div className={`${styles.bottom_nav} ${fixed ? styles.fixed : ""}`}>
      {children}      
    </div>
  );
}

BottomNav.Button = NavButton;
BottomNav.Button.Icon = NavButtonIcon;
BottomNav.Button.Label = NavButtonLabel;

export default BottomNav;
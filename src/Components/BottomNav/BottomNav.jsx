
import styles from './bottomNav.module.css';

const BottomNav = ({ eventHandler,buttons=[] }) => {

  const onNavButtonClick = (e,action) => {    
    eventHandler && eventHandler(e,action);
  }

  return (
  <div className={styles.bottom_nav}>
    {buttons.map(button => {      
      return (
      <button data-action={button.action} className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,button.action)}>
        {button.icon}
      </button>
      )
    })}
    </div>
  );
}

export default BottomNav;

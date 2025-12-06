
import HomeIcon from '../../assets/icons/HomeIcon';
import styles from './bottomNav.module.css';

const BottomNav = ({ onClick }) => {

  const onNavButtonClick = (e,action) => {
    onClick && onClick(action);
  }

  return (
  <div className={styles.bottom_nav}>
    <button className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
      <HomeIcon size={40} />
    </button>
    <button className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
      <HomeIcon size={40} />
    </button>
    <button className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
      <HomeIcon size={40} />
    </button>
    
    </div>
  );
}

export default BottomNav;
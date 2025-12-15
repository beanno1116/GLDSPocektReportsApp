
import DeepReportsIcon from '../../assets/icons/DeepReportsIcon';
import FavoriteReportsIcon from '../../assets/icons/FavoriteReportsIcon';
import HomeIcon from '../../assets/icons/HomeIcon';
import styles from './bottomNav.module.css';

const BottomNav = ({ onClick,buttons=[],borderRadius="0 0 1rem 1rem" }) => {

  const onNavButtonClick = (e,action) => {
    onClick && onClick("/");
  }

  return (
  <div className={styles.bottom_nav} style={{borderRadius:borderRadius}}>
    {buttons.map(button => {
      return (
      <button data-action={button.action} className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
        {button.icon}
      </button>
      )
    })}
    {/* <button className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
      <FavoriteReportsIcon size={40} />
    </button>
    <button className={styles.nav_icon} onClick={(e) => onNavButtonClick(e,"/")}>
      <DeepReportsIcon size={40} />
    </button> */}
    
    </div>
  );
}

export default BottomNav;

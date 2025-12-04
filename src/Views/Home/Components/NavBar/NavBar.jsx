
import styles from './navBar.module.css';
import siteStyles from '../../../../site.module.css';
import NavButton from '../../../../Components/Buttons/NavButton';
import ManageUsersIcon from '../../../../assets/icons/ManageUsersIcon';
import SettingsIcon from '../../../../assets/icons/SettingsIcon';
import AlertIcon from '../../../../assets/icons/AlertIcons';
import HomeIcon from '../../../../assets/icons/HomeIcon';
import { useEffect, useRef, useState } from 'react';
import StoreIcon from '../../../../assets/icons/StoreIcon';
import { NAVBAR_BUTTON_ACTIVE_EVENT, NAVBAR_MANAGER_HOME_ACTION, NAVBAR_MANAGER_SETTING_ACTION, NAVBAR_MANAGER_STORE_ACTION, NAVBAR_MANAGER_USER_ACTION } from '../../../../Utilities';
import { subscribe, unsubscribe } from '../../../../events';

const NavBar = ({ onClick }) => {
  const [currentMenu,setCurrentMenu] = useState("home");

  const navRowRef = useRef();

  useEffect(() => {

    const updateActiveButtonEvent = (e) => {
      ;
      let details = e.detail;
      setCurrentMenu(details.menu);
    }

    subscribe(NAVBAR_BUTTON_ACTIVE_EVENT,updateActiveButtonEvent);
    return () => {
      unsubscribe(NAVBAR_BUTTON_ACTIVE_EVENT,updateActiveButtonEvent);
    }
  })

  const onNavButtonClick = (e,action) => {
    setCurrentMenu(action);
    onClick && onClick(action);
  }

  return (
    <div className={styles.nav_bar}>
      <div ref={navRowRef} className={`${siteStyles.panel_bg} ${styles.nav_bar_row}`}>          
        <NavButton active={currentMenu === NAVBAR_MANAGER_HOME_ACTION ? true : false} action={NAVBAR_MANAGER_HOME_ACTION} onClick={onNavButtonClick} >
          <HomeIcon size={30} />
        </NavButton>
        <NavButton active={currentMenu === NAVBAR_MANAGER_STORE_ACTION ? true : false} action={NAVBAR_MANAGER_STORE_ACTION} onClick={onNavButtonClick} >
          <StoreIcon size={30} />
        </NavButton>
        <NavButton active={currentMenu === NAVBAR_MANAGER_SETTING_ACTION ? true : false} action={NAVBAR_MANAGER_SETTING_ACTION} onClick={onNavButtonClick} >
          <SettingsIcon size={30} />
        </NavButton>
        <NavButton active={currentMenu === NAVBAR_MANAGER_USER_ACTION ? true : false} action={NAVBAR_MANAGER_USER_ACTION} onClick={onNavButtonClick} >
          <ManageUsersIcon size={30} />
        </NavButton>
      </div>
    </div>
  );
}

export default NavBar;

import { useRef } from 'react';
import siteStyles from '../../site.module.css';
import styles from './toolbar.module.css';
import NavButton from '../Buttons/NavButton';
import HomeIcon from '../../assets/icons/HomeIcon';
import RefreshIcon from '../../assets/icons/RefreshIcon';
import SolidCalendarIcon from '../../assets/icons/SolidCalendarIcon';
import SendIcon from '../../assets/icons/SendIcon';
import ExportIcon from '../../assets/icons/ExportIcon';
import OutlineCalendarIcon from '../../assets/icons/OutlineCalendarIcon';
import OutlineRefreshIcon from '../../assets/icons/OutlineRefreshIcon';
import ToolbarButton from './Components/ToolbarButton';

const reportToolbarButtons = [
  {
    id: 1,
    name: "",
    icon: <OutlineRefreshIcon size={30} color='snow' />,
    action: "refresh"
  },
  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={30} color='snow' />,
    action: "export"
  },
]


const Toolbar = ({ onClick,buttons=[],borderRadius="1rem" }) => {

  const navRowRef = useRef();

  const onNavButtonClick = (e) => {

  }

  return (
    <div className={styles.tool_bar} style={{borderRadius:borderRadius}}>
      <div ref={navRowRef} className={`${siteStyles.panel_bg} ${styles.tool_bar_row}`} style={{borderRadius:borderRadius}}> 
        {buttons.map((button,index) => {
          if (index === 1){
            return (
            <ToolbarButton action={button.action} onClick={onClick}>
              {button.icon}
            </ToolbarButton>
            )
          }
          return (
            <ToolbarButton action={button.action} onClick={onClick}>
              {button.icon}
            </ToolbarButton>
            // <NavButton action={button.action} onClick={onNavButtonClick} >
            // </NavButton>
          )
        })}        
        {/* <NavButton active={currentMenu === NAVBAR_MANAGER_HOME_ACTION ? true : false} action={NAVBAR_MANAGER_HOME_ACTION} onClick={onNavButtonClick} >
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
        </NavButton> */}
      </div>
    </div>
  );
}

export default Toolbar;
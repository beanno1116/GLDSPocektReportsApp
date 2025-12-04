

import { NAVBAR_MANAGER_SETTING_ACTION, NAVBAR_MANAGER_STORE_ACTION, NAVBAR_MANAGER_USER_ACTION,NAVBAR_BUTTON_ACTIVE_EVENT } from '../../Utilities';
import ManageUserView from '../../Views/ManageUser/ManageUserView';
import StoreSelectorPanel from '../../Views/StoreSelector/StoreSelectorPanel.jsx';
import styles from './homeViewManager.module.css';

const HomeViewManager = ({ nextView,activeStore,when }) => {
  console.log("HomeViewManager rendered");
  


  

  const renderHomeView = (view) => {

    switch (view) {
      case NAVBAR_MANAGER_USER_ACTION:
        return <ManageUserView />
      case NAVBAR_MANAGER_STORE_ACTION:
        return <StoreSelectorPanel activeStore={activeStore} />
      case NAVBAR_MANAGER_SETTING_ACTION:
        return <div>Settings view</div>
    }
  }

  return (
    <div className={`${styles.modal_panel} ${when ? styles.showing : ""}`}>
      {renderHomeView(nextView)}
    </div>
  );
}

export default HomeViewManager;
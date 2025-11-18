
import { useGetStoresForOrg } from '../../Api/ApiRoutes';
import { NAVBAR_MANAGER_SETTING_ACTION, NAVBAR_MANAGER_STORE_ACTION, NAVBAR_MANAGER_USER_ACTION } from '../../Utilities';
import ManageUserView from '../../Views/ManageUser/ManageUserView';
import StoreSelectorView from '../../Views/StoreSelector/StoreSelectorView';
import { loader } from '../Loader/LoaderModal';
import styles from './homeViewManager.module.css';

const HomeViewManager = ({ nextView,activeStore,stores,when }) => {
  console.log("HomeViewManager rendered");



  

  const renderHomeView = (view) => {
    if (activeStore === 0 && stores.length > 1){
      view = "store";
    }  
    debugger;
    switch (view) {
      case NAVBAR_MANAGER_USER_ACTION:
        return <ManageUserView stores={stores} />
      case NAVBAR_MANAGER_STORE_ACTION:
        return <StoreSelectorView currentStore={stores.filter(s=>s.id === activeStore)[0]}/>
      case NAVBAR_MANAGER_SETTING_ACTION:
        return <div>Settings view</div>
      default:
        return <StoreSelectorView />
    }
  }

  return (
    <div className={`${styles.modal_panel} ${(stores.length > 1 && activeStore === 0) || when ? styles.showing : ""}`}>
      {renderHomeView(nextView)}
    </div>
  );
}

export default HomeViewManager;
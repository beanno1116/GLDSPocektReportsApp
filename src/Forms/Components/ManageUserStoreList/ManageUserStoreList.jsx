
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import StoreRow from '../StoreRow/StoreRow';
import siteStyles from '../../../site.module.css';
import styles from './manageUserStoreList.module.css';
import { useEffect, useRef } from 'react';
import Filter from '../../../Utils/Filter';





const ManageUserStoreList = ({ stores,currentUser,onClick }) => {


  const onStoreRowClick = (e,storeId) => {
    try {      
      onClick && onClick(e,storeId);
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div className={`${siteStyles.panel_bg} ${styles.user_list_panel}`}>
      <FlexColumn width='100%' g='1rem'>
        <div className={`${siteStyles.panel_bg} ${styles.user_list_panel_title}`}>
          Manage Store Access
        </div>
        <FlexColumn width='100%' g='1rem' p='.75rem 1rem'>
          {stores.map(store => {                
            if (!currentUser){
              return (
                <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>    
              )
            }
            // if (user.stores.filter(ustore => ustore === store.orgId).length > 0){
            if (currentUser.stores.includes(store.id)){
              return <StoreRow key={store.id} active={true} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>
            }
            return (
              <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>            
            )
          })}
        </FlexColumn>
      </FlexColumn>
    </div>
  );
}

export default ManageUserStoreList;

import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import StoreRow from '../StoreRow/StoreRow';
import siteStyles from '../../../site.module.css';
import styles from './manageUserStoreList.module.css';
import { useEffect, useRef } from 'react';
import Filter from '../../../Utils/Filter';
import useAppContext from '../../../hooks/useAppContext';
import ActionCard from '../../../Views/Templates/Components/Cards/ActionCard';
import StoreIcon from '../../../assets/icons/StoreIcon';
import WECheckbox from '../../../Components/Inputs/WECheckbox/WECheckbox';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import InputLabel from '../../../Components/Labels/InputLabel';
import LockIcon from '../../../assets/icons/LockIcon';
import CheckmarkIcon from '../../../assets/icons/CheckmarkIcon';





const ManageUserStoreList = ({ currentUser,onClick,p="1rem 1rem" }) => {
  const {state} = useAppContext();

  const onStoreRowClick = (e,storeId) => {
    try {
      
      onClick && onClick(e,storeId);
    } catch (error) {
      console.error(error.message);
    }
  }

  const onCheckboxClick = (e) => {
    
    currentUser.stores = state.stores.map(store => store.id);

  }

  return (
    <div className={`${styles.user_list_panel}`}>
      <FlexColumn width='100%' g='0'>
        <FlexRow hAlign='center' vAlign='center' g='1rem' p='1rem 0 0 0'>
          <InputLabel size="sm" text={"Authorize all"} />
          <WECheckbox size="lg" onChange={onCheckboxClick}/>
        </FlexRow>
        <FlexColumn width='100%' g='1rem' p={p}>
          {state.stores.map(store => {                
            if (!currentUser){
              return (              
                <ActionCard 
                  key={store.id}
                  title={store.name} 
                  cardId={store.id} 
                  subtitle={`${store.city}, ${store.state}`} 
                  icon={<LockIcon size={30} />}
                  onClick={onStoreRowClick} />                                                        
                // <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>    
              )
            }
            // if (user.stores.filter(ustore => ustore === store.orgId).length > 0){
            if (currentUser.stores.includes(store.id)){
              return (
                <ActionCard 
                  key={store.id}
                  status={true} 
                  cardId={store.id} 
                  title={store.name} 
                  subtitle={`${store.city}, ${store.state}`} 
                  icon={<CheckmarkIcon size={30} />}
                   onClick={onStoreRowClick} />
              )
              return <StoreRow key={store.id} active={true} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>
            }
            return (
              <ActionCard 
                key={store.id}
                title={store.name} 
                cardId={store.id} 
                subtitle={`${store.city}, ${store.state}`} 
                icon={<LockIcon size={30} />} 
                onClick={onStoreRowClick} />   
              // <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>            
            )
          })}
        </FlexColumn>
      </FlexColumn>
    </div>
  );
}

export default ManageUserStoreList;
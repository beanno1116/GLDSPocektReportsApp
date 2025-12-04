
import Heading from '../../Components/Labels/Heading';
import styles from './storeSelectorView.module.css';
import StoreButtonNav from './Components/StoreButtonNav';
import { publish } from '../../events';
import { NAVBAR_BUTTON_ACTIVE_EVENT, STORE_CHANGE_EVENT } from '../../Utilities';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useApiClient } from '../../Api/Api';
import Filter from '../../Utils/Filter';



const StoreSelectorPanel = ({ activeStore }) => {
  const {state,dispatch} = useContext(AppContext);

  const currentStore = Filter.storeById(state.stores,activeStore);
    
  const api = useApiClient();

  const onUserRowClick = (e) => {    
    let button = e.currentTarget;  
    let id = button.dataset.value;
    let store = state.stores.filter(s => parseInt(s.id) === parseInt(id))[0];  
    let agentString = store.agentString;
    api.updateAgentString(agentString);
    let localData = localStorage.getItem("org");
    if (localData){
      localData = JSON.parse(localStorage.getItem("org"));
      localData = {...localData,activeStore:store.id,agentString};
      localStorage.setItem("org",JSON.stringify(localData));
    }
    dispatch({action:"all",payload:{...state,agentString,activeStore:store.id}});
    publish(STORE_CHANGE_EVENT,{event:e,id:id,store,agentString});
    publish(NAVBAR_BUTTON_ACTIVE_EVENT,{event:e,menu:"home"});
  }




  return (
    <div className={styles.manage_user}>
       <Heading size='lg' mode='lite'>Select A Store</Heading>
       <Heading size='md' mode='lite'>Current: {currentStore?.name}</Heading>

       <div className={styles.store_selector_menu}>

          <div className={styles.store_selector_menu_scrollview}>
            {state.stores.map(store => {

              return (
                <StoreButtonNav key={store.id} store={store} onClick={onUserRowClick}/>
              )
            })}
          </div>

        </div>

    </div>
  );
}

export default StoreSelectorPanel;
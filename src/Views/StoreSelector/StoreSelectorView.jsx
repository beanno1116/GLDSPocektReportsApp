
import Heading from '../../Components/Labels/Heading';
import styles from './storeSelectorView.module.css';
import StoreButtonNav from './Components/StoreButtonNav';
import { publish } from '../../events';
import { NAVBAR_BUTTON_ACTIVE_EVENT, STORE_CHANGE_EVENT } from '../../Utilities';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useApiClient } from '../../Api/Api';



const storeData = [
  {
    id: 1,
    name: "Freddies",
    city: "Atlanta",
    state: "Mi"
  },
  {
    id: 2,
    name: "Eli's Market",
    city: "Lewiston",
    state: "Mi"
  },
]

const StoreSelectorView = ({ currentStore }) => {
  const {state,dispatch} = useContext(AppContext);
  const api = useApiClient();
  const onUserRowClick = (e) => {
    let button = e.currentTarget;  
    let id = button.dataset.value;
    let store = state.stores.filter(s => parseInt(s.id) === parseInt(id))[0];  
    api.updateAgentString(store.agentString);
    publish(STORE_CHANGE_EVENT,{event:e,id:id});
    publish(NAVBAR_BUTTON_ACTIVE_EVENT,{event:e,menu:"home"});

  }


  return (
    <div className={styles.manage_user}>
       <Heading size='lg'>Select A Store</Heading>
       <Heading size='md'>Current: {currentStore?.name}</Heading>

       <div className={styles.store_selector_menu}>

          <div className={styles.store_selector_menu_scrollview}>
            {state.stores.map(store => {
              return (
                <StoreButtonNav store={store} onClick={onUserRowClick}/>
              )
            })}
          </div>

        </div>

    </div>
  );
}

export default StoreSelectorView;
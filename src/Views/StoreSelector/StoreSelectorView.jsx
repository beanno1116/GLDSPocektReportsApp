
import Heading from '../../Components/Labels/Heading';
import styles from './storeSelectorView.module.css';
import StoreButtonNav from './Components/StoreButtonNav';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useApiClient } from '../../Api/Api';
import { useNavigate } from 'react-router';
import Filter from '../../Utils/Filter';






const StoreSelectorView = () => {
  const {state,dispatch} = useContext(AppContext);
  const navigate = useNavigate();
    
  const api = useApiClient();

  

  const onUserRowClick = (e) => {  

    let button = e.currentTarget;  
    let id = button.dataset.value;

    let store = Filter.storeById(state.stores,id);

    let agentString = store.agentString;
    api.updateAgentString(agentString);

    let localData = localStorage.getItem("org");

    if (localData){
      localData = JSON.parse(localStorage.getItem("org"));
      localData = {...localData,activeStore:store.id,agentString};
      localStorage.setItem("org",JSON.stringify(localData));
    }
    
    dispatch({action:"all",payload:{...state,agentString,activeStore:store.id}});    
    navigate("/")

  }




  return (
    <div className={styles.store_selector_panel}>

       <Heading size='lg' mode='lite'>Choose a Store</Heading>       

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

export default StoreSelectorView;
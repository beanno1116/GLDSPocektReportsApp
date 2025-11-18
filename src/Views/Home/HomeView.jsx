
import styles from './homeView.module.css';


import MenuGrid from './Components/MenuGrid/MenuGrid';
import NavBar from './Components/NavBar/NavBar';
import QuickView from './Components/QuickView/QuickView';
import { useCallback, useContext, useEffect, useState } from 'react';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import { loader } from '../../Components/Loader/LoaderModal';
import HomeViewManager from '../../Components/HomeViewManager/HomeViewManager';
import { subscribe, unsubscribe } from '../../events';
import { STORE_CHANGE_EVENT } from '../../Utilities';
import { useGetStoresForOrg } from '../../Api/ApiRoutes';
import { AppContext } from '../../Contexts/AppContext';
import { useApiClient } from '../../Api/Api';


const isLastAdmin = (users,userId) => {
  try {
    const doesAdminExist = users.filter(user => user.id !== userId).some(user => user.isAdmin === true);
    if (doesAdminExist) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`[ERROR] [HomeView] [isLastAdmin] - ${error.message}`);
  }
}

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

const ACCOUNT_USER_COUNT = 4;


let renderCount = 0;

let activeStoreCache = 0;


const HomeView = ({ ...props }) => {
  console.log("HomeView rendered " + renderCount++);
  const api = useApiClient();
  const {state,dispatch} = useContext(AppContext);
  // const {status,stores} = useGetStoresForOrg();
  const [showModal,setShowModal] = useState(false);
  const [currentView,setCurrentView] = useState("");
  const [activeStore,setActiveStore] = useState(activeStoreCache);
  debugger;
  
  

  // let storeContext = storeData.filter(store => parseInt(store.id) === parseInt(activeStore))[0];


  useEffect(() => {
    const storeChangeEventHandler = (e) => {
      debugger;
      let details = e.detail;
      setShowModal(false);
      setActiveStore(parseInt(details.id));
      const selectedStore = state.stores.filter(store => parseInt(store.id) === parseInt(details.id));
      if (selectedStore.length > 0){
        let storeAgentString = selectedStore[0].agentString;
        api.updateAgentString(storeAgentString);        
      }
      activeStoreCache = parseInt(details.id);
      setCurrentView("home");
    }

    subscribe(STORE_CHANGE_EVENT,storeChangeEventHandler);
    return () => {
      activeStoreCache = activeStore;
      unsubscribe(STORE_CHANGE_EVENT,storeChangeEventHandler);
    }
  })

  

  const onNavBarClick = useCallback((e,action) => {
    if (action === "home"){
      setShowModal(false);
      return;
    }
  
    setShowModal(false);
    
    setCurrentView(action);
    
    setShowModal(true);

  },[])

  // if (status.isLoading){
  //   return null;
  // }
  
  loader.loaded();


  return (
    <div className={styles.home_view} style={{display:"flex",flexDirection:"column"}}>

      <FlexColumn width='100%' height='100%'>

        <Heading size='lg'>Store Name</Heading>        
        {/* <Heading size='lg'>{storeContext ? storeContext.name : "Store Name"}</Heading>         */}

        <QuickView />

        <MenuGrid />

        <HomeViewManager 
          nextView={currentView}
          activeStore={activeStore}
          stores={state.stores}
          when={showModal}
          />

        

      </FlexColumn>


      <NavBar onClick={onNavBarClick}/>


    </div>
  );
}

export default HomeView;
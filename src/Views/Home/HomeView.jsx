
import styles from './homeView.module.css';


import MenuGrid from './Components/MenuGrid/MenuGrid';
import NavBar from './Components/NavBar/NavBar';
import QuickView from './Components/QuickView/QuickView';
import { useCallback, useContext, useEffect, useState } from 'react';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import HomeViewManager from '../../Components/HomeViewManager/HomeViewManager';
import { subscribe, unsubscribe } from '../../events';
import { STORE_CHANGE_EVENT } from '../../Utilities';
import { AppContext } from '../../Contexts/AppContext';
import { Store } from '../../Models/Store';



const ACCOUNT_USER_COUNT = 4;


let renderCount = 0;




const HomeView = ({ ...props }) => {
  console.log("HomeView rendered " + renderCount++);
  const {state,dispatch} = useContext(AppContext);

  

  const [showModal,setShowModal] = useState(false);
  const [currentView,setCurrentView] = useState("");
  




  useEffect(() => {

    const storeChangeEventHandler = (e) => {
      setShowModal(false);
      setCurrentView("home");
    }

    subscribe(STORE_CHANGE_EVENT,storeChangeEventHandler);
    return () => {      
      unsubscribe(STORE_CHANGE_EVENT,storeChangeEventHandler);
    }
  })

  const onNavBarClick = useCallback((action) => {
    
    if (action === "home"){
      setShowModal(false);
      return;
    }
  
    setShowModal(false);
    
    setCurrentView(action);
    
    setShowModal(true);

  },[])



  const getStoreContext = (org) => {    
    let context = Store;
    if (org?.stores.length > 0){
      context = org.stores.filter(store => parseInt(store.id) === parseInt(state.activeStore))[0];
    }
    return context;
  }
  

  let storeContext = getStoreContext(state);




  return (
    <div className={styles.home_view} style={{display:"flex",flexDirection:"column"}}>

      <FlexColumn width='100%' height='100%'>

        {/* <Heading size='lg'>Store Name</Heading>         */}
        <Heading size='lg'>{storeContext ? storeContext.name : "Store Name"}</Heading>        

        <QuickView />

        <MenuGrid />

        <HomeViewManager 
          nextView={currentView}
          activeStore={state.activeStore}
          stores={state.stores}
          when={showModal}
          />

        

      </FlexColumn>


      <NavBar onClick={onNavBarClick}/>


    </div>
  );
}

export default HomeView;
import { useCallback, useContext, useEffect, useState } from 'react';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import HomeViewManager from '../../Components/HomeViewManager/HomeViewManager';
import { subscribe, unsubscribe } from '../../events';
import { STORE_CHANGE_EVENT } from '../../Utilities';
import { AppContext } from '../../Contexts/AppContext';
import Store from '../../Models/Store';
import View from '../Templates/View/View';
import QuickView from '../../Components/QuickView/QuickView';
import MenuGrid from '../../Components/MenuGrid/MenuGrid';
import NavBar from '../../Components/NavBar/NavBar';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import { homeMenuGridItems } from '../../Components/MenuGrid/Grids/Grids';
import BottomNav from '../../Components/BottomNav/BottomNav';
import StoreIcon from '../../assets/icons/StoreIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import ManageUsersIcon from '../../assets/icons/ManageUsersIcon';
import HomeIcon from '../../assets/icons/HomeIcon';



let renderCount = 0;

const homeViewBottomNavButtons = [
  {
    id: 2,
    name: "",
    icon: <HomeIcon size={36} color='snow' />,
    action: "home"
  },
  {
    id: 3,
    name: "",
    icon: <StoreIcon size={36} color="snow" />,
    action: "store"
  },
  {
    id: 4,
    name: "",
    icon: <SettingsIcon size={36} color="snow" /> ,
    action: "setting"
  },
    {
    id: 1,
    name: "",
    icon: <ManageUsersIcon size={36} color='snow' />,
    action: "user"
  }
]


const useHomeView = () => {
  const {state} = useContext(AppContext);
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

  const onNavBarClick = useCallback((e,action) => {
    
    if (action === "home"){
      setShowModal(false);
      return;
    }
  
    setShowModal(false);
    
    setCurrentView(action);
    
    setShowModal(true);

  },[])


  const getStoreContext = (org) => {    

    let context = new Store();
    if (org?.stores.length > 0){
      context = org.stores.filter(store => parseInt(store.id) === parseInt(state.activeStore))[0];
    }
    return context;
  }
  

  let storeContext = getStoreContext(state);

  return {
    state,
    showModal,
    currentView,
    storeContext,
    onNavBarClick
  }
}



const HomeView = () => {
  console.log("HomeView rendered " + renderCount++);
  const {state,showModal,currentView,storeContext,onNavBarClick} = useHomeView();

  return (
    <View>

      <Heading size='lg' mode='lite'>{storeContext ? storeContext.name : "Store Name"}</Heading>        

      <QuickView />

      <MenuGrid gridItems={homeMenuGridItems}/>

      <HomeViewManager 
        nextView={currentView}
        activeStore={state.activeStore}          
        when={showModal}
        />

      <BottomNav buttons={homeViewBottomNavButtons} eventHandler={onNavBarClick} />

    </View>
  );
}

export default HomeView;
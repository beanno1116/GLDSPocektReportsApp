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

import styles from './homeView.module.css';
import ScrollSelector from '../../Components/ScrollSelector/ScrollSelector';
import KpiGrid from '../../Components/Grids/KpiGrid';
import HorizontalScrollView from '../../Components/ScrollView/HorizontalScrollView';
import ScrollView from '../../Components/ScrollView/ScrollView';
import ReportsIcons from '../../assets/icons/ReportsIcons';
import SolidReportIcon from '../../assets/icons/SolidReportIcon';
import UserIcon from '../../assets/icons/UserIcon';
import { UPDATE_ACTIVE_STORE } from '../../Contexts/actions';
import { useNavigate } from 'react-router';
import useChartComponent from '../../hooks/useChartComponent';
import Mutate from '../../Utils/Mutate';
import Format from '../../Utils/Format';
import { take } from '../../Utils/Utils';
import { useQueries } from '@tanstack/react-query';
import { useApiClient } from '../../Api/Api';
import SolidUserSettingIcon from '../../assets/icons/SolidUserSettingIcon';



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


  const handleStoreSelction = (e) => {
    const selectedStoreId = e.target.dataset.value;
    const activeStoreId = state.activeStore;
    if (selectedStoreId === activeStoreId) return;
    dispatch({type:UPDATE_ACTIVE_STORE,payload:selectedStoreId});    
  }
  
  let storeContext = getStoreContext(state);

  const renderStoreSelectorItems = () => {
    if (state.stores.length === 0) return <div style={{color:"red"}}>No stores found</div>
    return state.stores.map((store,index) => {
      const activeStoreId = state.activeStore;
      return (
        <ScrollSelector.Item 
          key={store.id} 
          id={store.id} 
          active={activeStoreId === store.id ? true : false} 
          text={store.name} 
          onClick={handleStoreSelction} 
        />
      )
    })
  }

  return {
    state,
    showModal,
    currentView,
    storeContext,
    onNavBarClick,
    render: {
      storeOptions: renderStoreSelectorItems
    }
  }
}

const homeViewQueries = [
  {
    action: "Stats",
    adapter(data) {
      const adaptedData = Mutate.storeStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    adapter(data){
      const adaptedData = Mutate.departmentTotals(data);
      return adaptedData;
    }
  }
]



const HomeView = () => {
  console.log("HomeView rendered " + renderCount++);
  const api = useApiClient();
  const {state,showModal,currentView,storeContext,onNavBarClick,render} = useHomeView();
  // const {status,parseChartData} = useChartComponent("DepartmentTotals",Mutate.departmentTotals);
  const navigate = useNavigate();
  const results = useQueries({
    queries: homeViewQueries.map(query => ({
      queryKey: [query.action,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {         
        const response = await api.post("data",{action:query.action,agentString:"dfdd44e8-be22-43ef-8313-95f2d1904566"},{...api.headers.applicationJson}); 
        if (response.success){
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    }))
  })

  const onBottomNavButtonClick = (e) => {
    const action = e.currentTarget.dataset.action;
    debugger
    navigate(action,{ viewTransition: true });    
  }

  // if (status.isLoading){
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
  
  // const departmentTotals = parseChartData();
  const viewData = results.map(r => r.data);
  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);

  if (isLoading){
    debugger;
    return (
      <div>Loading....</div>
    )
  }
  
  if (isError){
    return (
      <div>ERROR!!</div>
    )
  }

  const temp = viewData;
  debugger;

  const dataObj = {
    stats: viewData[0],
    departments: viewData[1]
  }

  return (
    <View>

      <View.Header title="Dashboard" />

      <ScrollSelector>
        {render.storeOptions()}
      </ScrollSelector>

      <ScrollView>

        <KpiGrid>
          <KpiGrid.Item title="Revenue" value={`$${Format.moneyAbbreviation(dataObj.stats.totalSales.total)}`} subValue={"↑ 12.3%"} />
          <KpiGrid.Item title="Transactions" value={Format.moneyAbbreviation(dataObj.stats.totalSales.quantity)} subValue={"↑ 8.1%"} />
          <KpiGrid.Item title="Avg Basket" value={`$${(dataObj.stats.totalSales.total / dataObj.stats.totalSales.quantity).toFixed(2)}`} subValue={"↑ 3.8%"} />
          <KpiGrid.Item title="Margin" value={"28.4%"} subValue={"↓ 1.2%"} />
        </KpiGrid>

        <div className={styles.chart_section}>
          <div className={styles.chart_header}>
            <div className={styles.chart_title}>Weekly Sales</div>
            <div className={styles.chart_period}>Weekly Sales</div>
          </div>
          <div className={styles.chart_bars}>
            <div className={styles.chart_bar} style={{height:" 58%"}}></div>
            <div className={styles.chart_bar} style={{height:" 72%"}}></div>
            <div className={styles.chart_bar} style={{height:" 65%"}}></div>
            <div className={styles.chart_bar} style={{height:" 88%"}}></div>
            <div className={styles.chart_bar} style={{height:" 94%"}}></div>
            <div className={styles.chart_bar} style={{height:" 100%"}}></div>
            <div className={styles.chart_bar} style={{height:" 76%"}}></div>
          </div>

          <div className={styles.chart_labels}>
                <div className={styles.chart_label}>MON</div>
                <div className={styles.chart_label}>TUE</div>
                <div className={styles.chart_label}>WED</div>
                <div className={styles.chart_label}>THU</div>
                <div className={styles.chart_label}>FRI</div>
                <div className={styles.chart_label}>SAT</div>
                <div className={styles.chart_label}>SUN</div>
            </div>
        </div>

        <div className={styles.category_section}>
          
            <div className={styles.section_title}>Top Departments</div>

            {[...take(5,dataObj.departments)].map(dept => {
            return (
              <div className={styles.category_item}>
                <div className={styles.category_info}>
                    <div className={styles.category_name}>{dept.description.toLowerCase()}</div>
                    <div className={styles.category_subtitle}>{Format.moneyAbbreviation(parseFloat(dept.quantity))} units sold</div>
                </div>
                <div className={styles.category_metric}>
                    <div className={styles.category_value}>${Format.moneyAbbreviation(parseFloat(dept.total))}</div>
                    <div className={`${styles.category_change} ${styles.up}`}>+15.2%</div>
                </div>
              </div>
            )
          })}
            
            {/* <div className={styles.category_item}>
                <div className={styles.category_info}>
                    <div className={styles.category_name}>Produce</div>
                    <div className={styles.category_subtitle}>42.3K units sold</div>
                </div>
                <div className={styles.category_metric}>
                    <div className={styles.category_value}>$89K</div>
                    <div className={`${styles.category_change} ${styles.up}`}>+15.2%</div>
                </div>
            </div>

            <div className={styles.category_item}>
                <div className={styles.category_info}>
                    <div className={styles.category_name}>Dairy & Eggs</div>
                    <div className={styles.category_subtitle}>31.8K units sold</div>
                </div>
                <div className={styles.category_metric}>
                    <div className={styles.category_value}>$67K</div>
                    <div className={`${styles.category_change} ${styles.up}`}>+9.8%</div>
                </div>
            </div>

            <div className={styles.category_item}>
                <div className={styles.category_info}>
                    <div className={styles.category_name}>Bakery</div>
                    <div className={styles.category_subtitle}>28.1K units sold</div>
                </div>
                <div className={styles.category_metric}>
                    <div className={styles.category_value}>$54K</div>
                    <div className={`${styles.category_change} ${styles.up}`}>+6.4%</div>
                </div>
            </div>

            <div className={styles.category_item}>
                <div className={styles.category_info}>
                    <div className={styles.category_name}>Beverages</div>
                    <div className={styles.category_subtitle}>19.7K units sold</div>
                </div>
                <div className={styles.category_metric}>
                    <div className={styles.category_value}>$41K</div>
                    <div className={`${styles.category_change} ${styles.down}`}>-2.1%</div>
                </div>
            </div> */}
        <div style={{position:"relative",width:"100%",height:"85px"}}></div>
        </div>

      </ScrollView>

      
    
    <div className={styles.bottom_nav}>
      <button data-action="reports" className={`${styles.nav_item} ${styles.active}`} onClick={onBottomNavButtonClick}>          
          <div className={styles.nav_icon}><SolidReportIcon size={40} /></div>          
          <div className={styles.nav_label}>Reports</div>
      </button>
      <button data-action="stores" className={styles.nav_item} onClick={onBottomNavButtonClick}>
          <div className={styles.nav_icon}><StoreIcon size={40} /></div>
          <div className={styles.nav_label}>Stores</div>
      </button>
      <button data-action="/manage/users" className={styles.nav_item} onClick={onBottomNavButtonClick}>
          <div className={styles.nav_icon}><SolidUserSettingIcon size={40} /></div>
          <div className={styles.nav_label}>Users</div>
      </button>
      <button data-action="settings" className={styles.nav_item} onClick={onBottomNavButtonClick}>
          <div className={styles.nav_icon}><SettingsIcon size={40} /></div>
          <div className={styles.nav_label}>Settings</div>
      </button>
    </div>

    </View>
  );
}

export default HomeView;
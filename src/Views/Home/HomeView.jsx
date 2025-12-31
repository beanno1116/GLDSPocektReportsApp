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
import TopCategorySection from '../Templates/Components/Sections/TopCategorySection';
import DateUtility from '../../Utils/DateUtils';
import LocDataAdapter from '../../Models/LocReportAdapter';
import { loader } from '../../Components/Loader/LoaderModal';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';



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
  const api = useApiClient();
  const navigate = useNavigate();
  const results = useQueries({
    queries: homeViewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {       
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: query.posFields
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson}); 
        debugger;
        // const response = await api.post("data",{action:query.action,agentString:"dfdd44e8-be22-43ef-8313-95f2d1904566"},{...api.headers.applicationJson}); 
        if (response.success){
          const adaptedData = query.adapter(response.data);
          debugger;
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    }))
  })

  

  const onNavBarClick = useCallback((e,action) => {
    navigate(action,{viewTransition:true})
  },[navigate])


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
    storeContext,
    onNavBarClick,
    render: {
      storeOptions: renderStoreSelectorItems
    },
    results
  }
}

const homeViewQueries = [
  {
    action: "Stats",
    key: `stats_home_view_${Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))}`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {
      debugger;
      const adaptedData = Mutate.storeStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    key: `stats_home_view_${Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))}`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))
    },
    adapter(data) {
      debugger;
      const adaptedData = Mutate.storeStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    key: `dept_totals_${Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))}`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data){
      const adaptedData = Mutate.departmentTotals(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    key: `dept_totals_comp_${Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))}`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))
    },
    adapter(data){
      const adaptedData = Mutate.departmentTotals(data);
      return adaptedData;
    }
  }
]



const HomeView = () => {
  console.log("HomeView rendered " + renderCount++);  
  const {render,results,onNavBarClick} = useHomeView();
  




  const viewData = results.map(r => r.data);
  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);

  if (isLoading){    
    return (
      <FullScreenLoader text={"Loading Dashboard Data"} />
    )
  }
  
  if (isError){
    return (
      <div>ERROR!!</div>
    )
  }

  const data = LocDataAdapter.parseHomeViewData(viewData);

  return (
    <View>

      <View.Header showDate={true} title="Dashboard" />

      <ScrollSelector>
        {render.storeOptions()}
      </ScrollSelector>

      <ScrollView>

        {/* Store sale stats */}
        <KpiGrid>
          {data.stats.map(stat => {
            return (
              <KpiGrid.Item title={stat.title} value={Format.string(stat.value,stat.format)} subValue={`↑ ${Format.string(7,"percentage")}`} />              
            )
          })}
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

        {/* Top department sales */}
        <TopCategorySection title={"Top Departments"}>
          {[...take(5,data.departments)].map(cat => {
            return (
              <TopCategorySection.Item 
                name={cat.description.toLowerCase()}
                subtitle={`${Format.moneyAbbreviation(parseFloat(cat.quantity))} units sold`}
                value={Format.moneyAbbreviation(parseFloat(cat.total))} 
                delta={Format.string(cat.totalDelta,"percentage")}/>

            )
          })}
          {/* <div style={{position:"relative",width:"100%",height:"85px"}}></div> */}
        </TopCategorySection>

        <View.SectionTitle m='0'>Exceptions</View.SectionTitle>

        {/* Exception totals stats */}
        <KpiGrid>
          {data.exceptions.map(exception => {
            return (
              <KpiGrid.Item title={exception.title} value={Format.moneyAbbreviation(exception.value)} subValue={`↑ ${Format.string(7,"percentage")}`} />              
            )
          })}
        </KpiGrid>

        <div style={{height:"190px",width:"100%",marginBottom:"60px",background:"red"}}></div>

      </ScrollView>

      
    
    <div className={styles.bottom_nav}>
      <button data-action="reports" className={`${styles.nav_item} ${styles.active}`} onClick={(e) => onNavBarClick(e,"reports")}>
          <div className={styles.nav_icon}><SolidReportIcon size={32} /></div>          
          <div className={styles.nav_label}>Reports</div>
      </button>
      <button data-action="stores" className={styles.nav_item} onClick={(e) => onNavBarClick(e,"stores")}>
          <div className={styles.nav_icon}><StoreIcon size={32} /></div>
          <div className={styles.nav_label}>Stores</div>
      </button>
      <button data-action="/manage/users" className={styles.nav_item} onClick={(e) => onNavBarClick(e,"/manage/users")}>
          <div className={styles.nav_icon}><SolidUserSettingIcon size={32} /></div>
          <div className={styles.nav_label}>Users</div>
      </button>
      <button data-action="settings" className={styles.nav_item} onClick={(e) => onNavBarClick(e,"settings")}>
          <div className={styles.nav_icon}><SettingsIcon size={32} /></div>
          <div className={styles.nav_label}>Settings</div>
      </button>
    </div>

    </View>
  );
}

export default HomeView;
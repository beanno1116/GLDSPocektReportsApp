import { useCallback, useContext } from 'react';

import { AppContext } from '../../Contexts/AppContext';
import Store from '../../Models/Store';
import View from '../Templates/View/View';

import StoreIcon from '../../assets/icons/StoreIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import SolidUserSettingIcon from '../../assets/icons/SolidUserSettingIcon';
import SolidReportIcon from '../../assets/icons/SolidReportIcon';


import styles from './homeView.module.css';
import KpiGrid from '../../Components/Grids/KpiGrid';
import ScrollView from '../../Components/ScrollView/ScrollView';
import { UPDATE_STORE_CHANGE } from '../../Contexts/actions';
import { useNavigate } from 'react-router';
import Format from '../../Utils/Format';
import { take } from '../../Utils/Utils';
import { useQueries } from '@tanstack/react-query';
import { useApiClient } from '../../Api/Api';
import TopCategorySection from '../Templates/Components/Sections/TopCategorySection';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
import StoreSelector from '../../Components/StoreSelector/StoreSelector';
import Filter from '../../Utils/Filter';
import viewQueries from '../../Api/Queries/HomeViewQueries';
import viewAdapter from './Adapters/ViewDataAdapter';



let renderCount = 0;



const useHomeView = () => {
  const {state,dispatch} = useContext(AppContext);
  const api = useApiClient();
  const navigate = useNavigate();
  const results = useQueries({
    queries: viewQueries().map(query => ({
      queryKey: [`${query.key}`,state.agentString],
      queryFn: async () => {       
        const paramObj = {
          action: query.action,
          agentString: state.agentString,
          posFields: query.dateRange
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson}); 

        if (response.success){
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    }))
  })

  

  const onNavBarClick = useCallback((action) => (e) => {
    navigate(action,{viewTransition:true})
  },[navigate])


  const getStoreContext = (org) => {    
    let context = new Store();
    if (org?.stores.length > 0){
      const filteredContext = Filter.storeById(org.stores,state.activeStore);
      if (filteredContext.length > 0){
        return filteredContext[0]
      }
    }
    return context;
  }


  const onStoreSelected = useCallback((e,storeId,storeAgent) => {
    dispatch({type:UPDATE_STORE_CHANGE,payload:{activeStore:storeId,agentString:storeAgent}});    
  },[dispatch])
  
  let storeContext = getStoreContext(state);



  return {
    state,        
    storeContext,
    onNavBarClick,
    onStoreSelected,
    results
  }
}





const HomeView = () => {
  console.log("HomeView rendered " + renderCount++);  
  const {state,results,onNavBarClick,onStoreSelected} = useHomeView();
  




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
  
  const {stats,exceptions,departments} = viewAdapter(viewData);

  
  return (
    <View>
      
      <View.DropdownHeader showDate={true} title={"Dashboard"} />
      
      <StoreSelector stores={state.stores} activeStore={state.activeStore} onClick={onStoreSelected} />



      <ScrollView>

        {/* Store sale stats */}
        <View.SectionTitle m='0 0 .5rem 0'>General</View.SectionTitle>
        <KpiGrid>
          {stats.map(stat => {
            return (
              <KpiGrid.Item key={`${stat.title}_${stat.value}`} title={stat.title} value={stat.value} subValue={`${stat.delta}`} type={stat.format} />              
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
          {[...take(5,departments)].map(cat => {
            return (
              <TopCategorySection.Item 
                name={cat.description.toLowerCase()}
                subtitle={`${Format.string(cat.quantity,Format.NUMBER_FORMAT)} units sold`}
                value={Format.moneyAbbreviation(parseFloat(cat.total))} 
                delta={Format.string(cat.totalDelta,"percentage")}/>

            )
          })}          
        </TopCategorySection>

        <View.SectionTitle m='0'>Exceptions</View.SectionTitle>

        {/* Exception totals stats */}
        <KpiGrid>
          {exceptions.map(exception => {
            return (
              <KpiGrid.Item key={`${exception.title}_${exception.value}`} title={exception.title} value={parseInt(exception.value)} type={Format.INTEGER_FORMAT} subValue={exception.delta} opposite={true} />              
            )
          })}
        </KpiGrid>        

      </ScrollView>

      <div className={styles.bottom_nav}>
        <button data-action="/report/groups" className={`${styles.nav_item} ${styles.active}`} onClick={onNavBarClick("/report/groups")}>
            <div className={styles.nav_icon}><SolidReportIcon size={32} /></div>          
            <div className={styles.nav_label}>Reports</div>
        </button>
        <button data-action="stores" className={styles.nav_item} onClick={onNavBarClick("stores")}>
            <div className={styles.nav_icon}><StoreIcon size={32} /></div>
            <div className={styles.nav_label}>Stores</div>
        </button>
        <button data-action="/manage/users" className={styles.nav_item} onClick={onNavBarClick("/manage/users")}>
            <div className={styles.nav_icon}><SolidUserSettingIcon size={32} /></div>
            <div className={styles.nav_label}>Users</div>
        </button>
        <button data-action="settings" className={styles.nav_item} onClick={onNavBarClick("settings")}>
            <div className={styles.nav_icon}><SettingsIcon size={32} /></div>
            <div className={styles.nav_label}>Settings</div>
        </button>
      </div>

    </View>
  );
}

export default HomeView;

import { useNavigate } from 'react-router';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import View from '../../Templates/View/View';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import TopCategorySection from '../../Templates/Components/Sections/TopCategorySection';
import SolidSafeIcon from '../../../assets/icons/SolidSafeIcon';
import DrawerIcon from '../../../assets/icons/DrawerIcon';
import LocDataAdapter from '../../../Models/LocReportAdapter';
import Format from '../../../Utils/Format';
import DateUtility from '../../../Utils/DateUtils';
import { useApiClient } from '../../../Api/Api';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import FullScreenLoader from '../../../Components/Loader/FullScreenLoader';
import SolidReportIcon from '../../../assets/icons/SolidReportIcon';
import DollarSignIcon from '../../../assets/icons/DollarSignIcon';
import ChartTabView from './Components/ChartTabView';
import { useCallback, useRef, useState } from 'react';
import RefreshIndicator from '../../../Components/Loader/RefreshIndicator';
import Calculate from '../../../Utils/Caclulate';
import WEModal from '../../../Components/WEModal/WEModal';
import useModal from '../../../Components/WEModal/hooks/useModal';
import DatePickerModal from '../../../Modals/DatePickerModal';
import PeriodSelector from '../../../Components/PeriodSelector/PeriodSelector';
import PerentSignIcon from '../../../assets/icons/PercentSignIcon';
import ViewModalManager from './Components/ViewModalManager';
import StatRecord from '../../../Models/StatRecord';
import { viewAdapter } from './viewDataAdapter';




const viewQueries = [
  {
    action: "Stats",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    key: "past",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
]



const useStoreReportsView = () => {
  const api = useApiClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {modalState,toggleModal} = useModal();


  const currentPeriod = useRef("today");
  const dateLockRef = useRef(false);

  const getPeriodDateRange = (key) => {
    const isDateLocked = dateLockRef.current;
    let selectedPeriod = currentPeriod.current;

    if (isDateLocked) {
      const lockedDateRange = DateUtility.getDateAtPeriodInterval(selectedPeriod,new Date());
      lockedDateRange.startDate = DateUtility.toRequestDateFormat(lockedDateRange.startDate);
      lockedDateRange.endDate = DateUtility.toRequestDateFormat(lockedDateRange.endDate);
      return lockedDateRange;
    }


    

    if (key === "past"){
      if (selectedPeriod === "prevWeek"){
        selectedPeriod = "week";
      }
      if (selectedPeriod === "today"){
        selectedPeriod = "prevDay";
      }
      if (selectedPeriod === "prevDay"){
        selectedPeriod = "today";
      }
      if (selectedPeriod === "prevMonth"){
        selectedPeriod = "month";
      }
    }
    

    const dateRange = DateUtility.getDateForPeriod(selectedPeriod);
    dateRange.startDate = Format.toRequestDateFormat(dateRange.startDate);
    dateRange.endDate = Format.toRequestDateFormat(dateRange.endDate);
    // 
    return dateRange;
  }
  
  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,currentPeriod.current,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: getPeriodDateRange(query.key)
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson});

        if (response.success){
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    })),
    combine: (results) => {      
      return {
        viewData: results.map(r => r.data),
        isLoading: results.some(r => r.isLoading),
        isPending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some(r => r.isError),
        refetchAll: () => {
          viewQueries.forEach(query => {
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,currentPeriod.current,"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })

  const onNavbarClick = (e) => {
    navigate("/report/groups",{viewTransition:true});
  }

  const onDateLockClick = (e,isLocked) => {
    dateLockRef.current = isLocked;
  }

  const onPeriodChange = useCallback((e,period) => {  
    e.stopPropagation();
    e.preventDefault(); 
    if (period === "custom"){
      toggleModal();
      currentPeriod.current = period;    
      return;
    }
    e.currentTarget.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth' 
    });    
    results.refetchAll();
    currentPeriod.current = period;    
   },[results,toggleModal])


  return {
    navigate,
    period: currentPeriod.current,
    results,
    modalState,
    toggleModal,
    onDateLockClick,
    onNavbarClick,
    onPeriodChange
  }
}



const StoreReportsView = ({ ...props }) => {
  const {navigate,results,onNavbarClick,modalState,toggleModal,onPeriodChange,onDateLockClick,period} = useStoreReportsView();


  if (results.isFetching){
    return (
      <FullScreenLoader text={"Loading Store Report Data"} />
    )
  }
  


  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }

  
  const {coupon,sales,tax,exceptions,loyalty,transaction} = viewAdapter(results.viewData[0],results.viewData[1]);

  const onViewAllClick = (e,action) => {
    debugger;
    navigate(action,{viewTransition:true});

  }

  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   
      
      <View.Header showDate={true} title={"Store Report"} onClick={onDateLockClick}/>

        <PeriodSelector currentPeriod={period} onClick={onPeriodChange}/>

        <ScrollView>


          
          <ChartTabView />

          <View.SectionHeader m='.5rem 0' title={"Sales"} viewAll={onViewAllClick} action="/report/stores/sales"/>
          <KpiGrid>
            {sales.length === 0 && <div>No data found</div>}
            {sales.map(stat => {
              return (
                <KpiGrid.SummaryItem 
                  icon={stat.format === "percentage" ? <PerentSignIcon size={20} /> : <DollarSignIcon size={24} />} 
                  label={stat.title} 
                  value={stat.value} 
                  type={stat.format} 
                  subValue={stat.delta}/>
              )
            })}
          </KpiGrid>

          <View.SectionHeader m='.5rem 0' title={"Loyalty"} viewAll={onViewAllClick} action="/report/stores/loyalty"/>
          <KpiGrid>
            {loyalty.length === 0 && <div>No data found!</div>}
            {
              loyalty.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
                )
              })
            }
          </KpiGrid>

          <View.SectionHeader m='.5rem 0' title={"Coupons"} />
          {
            coupon.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={`${item.quantity}`} value={item.value} />
              )
            })
          }


          <View.SectionTitle m='1rem 0 .5rem 0'>Safe & Drawer</View.SectionTitle>
          <KpiGrid>
            <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Safe Report"} />
            <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Drawer Report"} />
          </KpiGrid>

          
          <View.SectionHeader m='.5rem 0' title={"Taxes"} />
          {
            tax.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={item.quantity === 0 ? "" : `${item.quantity} items`} value={item.value} />
              )
            })
          }


          
          <View.SectionHeader m='.5rem 0' title={"Exceptions"} />
          <KpiGrid>
            {
              exceptions.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }            
          </KpiGrid>

          <View.SectionHeader title={"Transactions"} />
          <KpiGrid>
            {
              transaction.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={item.value} type={item.format} />
                )
              })
            }      
          </KpiGrid>

          <View.SectionTitle m='1rem 0 .5rem 0'>Tools</View.SectionTitle>
          <KpiGrid>
            <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Export"} />
            <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Send"} />
          </KpiGrid>

          <div style={{height:"75px",width:"100%"}}></div>
        </ScrollView>

       <View.BottomNav>
          <View.BottomNav.Button action="/report/groups" onClick={onNavbarClick} icon={<SolidReportIcon size={36} />}>Home</View.BottomNav.Button>
          {/* <View.BottomNav.Button icon={<StoreIcon size={32}/>}>Stores</View.BottomNav.Button> */}
          <View.BottomNav.Button>Analytics</View.BottomNav.Button>
          <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
          <View.BottomNav.Button icon={<SettingsIcon size={32} />}>Settings</View.BottomNav.Button>
        </View.BottomNav>

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={()=> toggleModal()}>
       <DatePickerModal onClose={() => toggleModal()}/>
       {/* <ViewModalManager modal={"loyalty"} /> */}
      </WEModal>
    </View>
  );
}

export default StoreReportsView;
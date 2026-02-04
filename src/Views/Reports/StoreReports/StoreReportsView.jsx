
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
import StoreIcon from '../../../assets/icons/StoreIcon';
import SecondaryButton from '../../../Components/Buttons/SecondaryButton';




const viewQueries = [
  {
    action: "Stats",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      // const adaptedData = LocDataAdapter.parseStoreStatsData(data);
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
  {
    action: "CurrentVsLastWeek",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseWeekData(data);
      return adaptedData;
    }
  },
]



const useStoreReportsView = () => {
  const api = useApiClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {modalState,toggleModal} = useModal();
  const [currentPeriod,setCurrentPeriod] = useState("today");

  const dateLockRef = useRef(false);

  const getPeriodDateRange = (key) => {
    const isDateLocked = dateLockRef.current;
    let selectedPeriod = currentPeriod;

    if (isDateLocked) {
      const lockedDateRange = DateUtility.getDateAtPeriodInterval(selectedPeriod,new Date());
      lockedDateRange.startDate = DateUtility.toRequestDateFormat(lockedDateRange.startDate);
      lockedDateRange.endDate = DateUtility.toRequestDateFormat(lockedDateRange.endDate);
      return lockedDateRange;
    }

    if (key === "past"){
      if (selectedPeriod === "prevWeek"){
        selectedPeriod = "week";
      } else if (selectedPeriod === "today"){
        selectedPeriod = "prevDay";
      } else if (selectedPeriod === "prevDay"){
        selectedPeriod = "today";
      } else if (selectedPeriod === "prevMonth"){
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
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566",getPeriodDateRange(query.key).startDate,getPeriodDateRange(query.key).endDate],
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
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,getPeriodDateRange(query.key),"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })

  const onNavbarClick = useCallback((route) => (e) => {
    navigate(route,{viewTransition:true});
  },[navigate])

  const onDateLockClick = (e,isLocked) => {
    dateLockRef.current = isLocked;
  }

  const onPeriodChange = useCallback((e,period) => {  
    e.stopPropagation();
    e.preventDefault(); 
    if (period === "custom"){
      toggleModal();
      setCurrentPeriod(period);        
      return;
    }
    e.currentTarget.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth' 
    });    
    setCurrentPeriod(period);
    // results.refetchAll();
    currentPeriod.current = period;    
   },[results,toggleModal,setCurrentPeriod])


  return {
    navigate,
    period: currentPeriod,
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
      <View>
        <RefreshIndicator when={results.isFetching} />   
      
        <View.Header showDate={true} title={"Store Report"} onClick={onDateLockClick}/>

        <PeriodSelector currentPeriod={period} onClick={onPeriodChange}/>
        <FullScreenLoader text={"Loading Store Report Data"} />
      </View>
    )
  }
  


  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }

  
  const {coupon,sales,tax,exceptions,loyalty,markdowns,transaction} = viewAdapter(results.viewData[0],results.viewData[1]);
  const weekData = results.viewData[2];
  debugger;
  const onViewAllClick = (e,action) => {
    navigate(action,{viewTransition:true});
  }

  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   
      
      <View.Header showDate={true} title={"Store Report"} onClick={onDateLockClick}/>

        <PeriodSelector currentPeriod={period} onClick={onPeriodChange}/>

        <ScrollView>

          {/* Store sales chart */}
          <ChartTabView chartData={weekData} />

          {/* Store sales KPI grid */}
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

          <View.SectionHeader m='.5rem 0' title={"Markdowns"} viewAll={onViewAllClick} action="/report/stores/sales"/>
          {markdowns.length === 0 && <div>No data found</div>}
          {
            markdowns.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={`${item.quantity} items`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
              )
            })
          }

          {/* Store loyalty KPI grid */}
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

          {/* Store coupon totals list  */}
          <View.SectionHeader m='.5rem 0' title={"Coupons"} />
          {
            coupon.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={`${item.quantity} redeemed`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
              )
            })
          }

          {/* Store report safe and drawer buttons  */}
          <View.SectionTitle m='1rem 0 .5rem 0'>Safe & Drawer</View.SectionTitle>
          <KpiGrid>
            <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Safe Report"} />
            <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Drawer Report"} />
          </KpiGrid>

          {/* Store taxes totals list  */}
          <View.SectionHeader m='.5rem 0' title={"Taxes"} />
          {
            tax.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={item.quantity === 0 ? "" : `${item.quantity} items`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
              )
            })
          }


          {/* Store exceptions KPI grid */}
          <View.SectionHeader m='.5rem 0' title={"Exceptions"} />
          <KpiGrid>
            {
              exceptions.map(item => {
                return (
                  <KpiGrid.Item title={item.title} opposite={true} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
                  // <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }            
          </KpiGrid>

          {/* Store transactions KPI grid */}
          <View.SectionHeader title={"Transactions"} />
          <KpiGrid>
            {
              transaction.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
                )
              })
            }      
          </KpiGrid>

          {/* Store report tool buttons */}
          <View.SectionTitle m='1rem 0 .5rem 0'>Tools</View.SectionTitle>          
          <KpiGrid>
            <SecondaryButton>Summary</SecondaryButton>
            <SecondaryButton>Targets</SecondaryButton>
            <SecondaryButton>Alerts</SecondaryButton>
            <SecondaryButton>Tender</SecondaryButton>
          </KpiGrid>

          <div style={{height:"75px",width:"100%"}}></div>
        </ScrollView>

       <View.BottomNav>
          <View.BottomNav.Button action="/report/groups" onClick={onNavbarClick} icon={<SolidReportIcon size={36} />}>Home</View.BottomNav.Button>
          <View.BottomNav.Button>Analytics</View.BottomNav.Button>
          <View.BottomNav.Button icon={<StoreIcon size={32}/>}>Stores</View.BottomNav.Button>
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
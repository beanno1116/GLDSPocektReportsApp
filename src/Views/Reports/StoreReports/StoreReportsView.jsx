
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import View from '../../Templates/View/View';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import TopCategorySection from '../../Templates/Components/Sections/TopCategorySection';
import SolidSafeIcon from '../../../assets/icons/SolidSafeIcon';
import DrawerIcon from '../../../assets/icons/DrawerIcon';
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
import WEModal from '../../../Components/WEModal/WEModal';
import useModal from '../../../Components/WEModal/hooks/useModal';
import PeriodSelector from '../../../Components/PeriodSelector/PeriodSelector';
import PerentSignIcon from '../../../assets/icons/PercentSignIcon';
import ViewModalManager from './Components/ViewModalManager';
import { viewAdapter } from './viewDataAdapter';
import StoreIcon from '../../../assets/icons/StoreIcon';
import SecondaryButton from '../../../Components/Buttons/SecondaryButton';
import ViewHeading from '../../../Components/Headings/ViewHeading';
import { viewQueries } from '../../../Api/Queries/StoreReportsViewQueries';
import useNavigateView from '../../../hooks/useNavigateView';
import DateRangeLabel from './Components/DateRangeLabel';
import Show from '../../../Components/Show/Show';
import useGlobalDate from '../../../hooks/useGlobalDate';
import useAppContext from '../../../hooks/useAppContext';
import NoDataView from '../../Templates/View/NoDataView';





const useStoreReportsView = () => {
  const {state,dispatch} = useAppContext();
  const api = useApiClient();
  const navigate = useNavigateView();
  const queryClient = useQueryClient();
  const {modalState,toggleModal} = useModal();
  const {dateRanges,setDateRanges,getDateRange} = useGlobalDate(DateUtility.calculateDateRange(new Date(),"today"));
  

  const dateLockRef = useRef(false);
  const period = useRef("today");
  const viewRef = useRef();

  
  const results = useQueries({
    queries: viewQueries(dateRanges,[state.agentString]).map(query => ({
      queryKey: query.key,
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
    })),
    combine: (results) => {      
      return {
        viewData: results.map(r => r.data),
        isLoading: results.some(r => r.isLoading),
        isPending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some(r => r.isError),
        refetchAll: () => {
          viewQueries(dateRanges,[state.agentString]).forEach(query => {
            queryClient.invalidateQueries({queryKey:query.key})
          })
        }
      };
    }
  })

  const onNavbarClick = useCallback((route) => (e) => {
    navigate(route);
  },[navigate])

  const showModalView = useCallback((route) => (e) => {
    debugger;
    viewRef.current = route;
    toggleModal();
  },[toggleModal])

  const onDateLockClick = (e,isLocked) => {
    dateLockRef.current = isLocked;
  }

  const onDateRangeChange = useCallback((dates) => {

    period.current = "custom";

    if (dates.length === 2){
      const dateRanges = {
        base: {
          startDate: dates[0],
          endDate: dates[1]
        },
        current: {
          startDate: dates[0],
          endDate: dates[1]
        }
      }
      setDateRanges(dateRanges);
      return;
    }

    if (dates.length > 2 && dates.length <= 7){
      const dateRanges = {
        base: {
          startDate: DateUtility.setWeekBack(dates[0],1),
          endDate: DateUtility.setWeekBack(dates[dates.length - 1],1)
        },
        current: {
          startDate: dates[0],
          endDate: dates[dates.length - 1]
        }
      }
      setDateRanges(dateRanges);
      return;
    }

    const dateRanges = {
      base: {
        startDate: DateUtility.setDateBack(dates[0],1),
        endDate: DateUtility.setDateBack(dates[0],1)
      },
      current: {
        startDate: dates[0],
        endDate: dates[0]
      }
    }

    setDateRanges(dateRanges);
    
  },[setDateRanges])

  const onPeriodChange = useCallback((e,newPeriod) => {  
    e.stopPropagation();
    e.preventDefault(); 
    if (newPeriod === "custom") return;
    e.currentTarget.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth' 
    });    

    const dateRange = DateUtility.calculateDateRange(new Date(),newPeriod);

    period.current = newPeriod;
    setDateRanges(dateRange);

      
   },[setDateRanges])


  return {
    dateRange: dateRanges.current,
    modalState,
    modalView: viewRef.current,
    navigate,
    onDateLockClick,
    onDateRangeChange,
    onNavbarClick,
    onPeriodChange,
    period: period.current,
    results,
    showModalView,
    toggleModal,
  }
}



const StoreReportsView = ({ ...props }) => {
  const {
    dateRange,
    modalState,
    modalView,
    navigate,
    onDateLockClick,
    onDateRangeChange,
    onNavbarClick,
    onPeriodChange,
    period,
    results,
    showModalView,
    toggleModal,
  } = useStoreReportsView();

  

  if (results.isFetching){
    return (
      <View>
        <RefreshIndicator when={results.isFetching} />   
        <ViewHeading title={"Store Report"} onClick={onDateRangeChange} />
        

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
  
  console.log("weekData");
  console.log(results.viewData[3]);


  
  const onViewAllClick = (e,action) => {
    e.stopPropagation();
    navigate(action,{viewTransition:true});
  }

  const onActionItemClick = (action) => {

  }

  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   

      <ViewHeading title={"Store Report"} onClick={onDateRangeChange} />

      <PeriodSelector currentPeriod={period} onClick={onPeriodChange}/>

      <DateRangeLabel start={dateRange.startDate} end={dateRange.endDate}/>

      <ScrollView>

        {/* Store sales chart */}
        <ChartTabView chartData={weekData} />

        {/* Store sales KPI grid */}
        <View.SectionHeader m='.5rem 0' title={"Sales"} viewAll={onViewAllClick} action="/report/stores/sales"/>
        <Show when={sales.length > 0} fallback={<NoDataView dataName={"sales"} />}>
          <KpiGrid>
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
        </Show>
     

        <View.SectionHeader m='.5rem 0' title={"Markdowns"} viewAll={onViewAllClick} action="/report/stores/sales"/>
        <Show when={markdowns?.length && markdowns.length > 0} fallback={<NoDataView dataName={"markdowns"} />}>
          {
            markdowns?.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={`${item.quantity} items`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
              )
            })
          }
        </Show>
        
        

        {/* Store loyalty KPI grid */}
        <View.SectionHeader m='.5rem 0' title={"Loyalty"} viewAll={onViewAllClick} action="/report/stores/loyalty"/>
        <Show when={loyalty?.length && loyalty.length > 0} fallback={<NoDataView dataName={"loyalty"} />}>
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
        </Show>

        {/* Store coupon totals list  */}
        <View.SectionHeader m='.5rem 0' title={"Coupons"} />
        <Show when={coupon.length > 1} fallback={<NoDataView dataName={"coupons"} />}>
        {
          coupon?.map(item => {
            return (
              <TopCategorySection.Item name={item.title} subtitle={`${item.quantity} redeemed`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
            )
          })
        }
        </Show>
        

        {/* Store report safe and drawer buttons  */}
        <View.SectionTitle m='1rem 0 .5rem 0'>Safe & Drawer</View.SectionTitle>
        <KpiGrid>
          <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Safe Report"} action="/report/stores/safe" onClick={onNavbarClick}/>
          <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Drawer Report"} action="drawer" onClick={onNavbarClick}/>
        </KpiGrid>

        {/* Store taxes totals list  */}
        <View.SectionHeader m='.5rem 0' title={"Taxes"} />
        <Show when={tax && tax.length > 0} fallback={<NoDataView dataName={"taxes"} />}>
          {
            tax?.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={item.quantity === 0 ? "" : `${item.quantity} items`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
              )
            })
          }
        </Show>


        {/* Store exceptions KPI grid */}
        <View.SectionHeader m='.5rem 0' title={"Exceptions"} />
        <Show when={exceptions?.length && exceptions.length > 0} fallback={<NoDataView dataName={"exceptions"} />}>
          <KpiGrid>
            {
              exceptions?.map(item => {
                return (
                  <KpiGrid.Item title={item.title} opposite={true} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
                  // <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }            
          </KpiGrid>
        </Show>

        {/* Store transactions KPI grid */}
        <View.SectionHeader m='.5rem 0' title={"Transactions"} />
        <Show when={transaction?.length && transaction.length > 0} fallback={<NoDataView dataName={"transaction"} />}>
          <KpiGrid>
            {
              transaction?.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
                )
              })
            }      
          </KpiGrid>
        </Show>

        {/* Store report tool buttons */}
        <View.SectionTitle m='1rem 0 .5rem 0'>Tools</View.SectionTitle>          
        <KpiGrid>
          <SecondaryButton action="summary" onClick={showModalView("summary")}>Summary</SecondaryButton>
          <SecondaryButton action="targets" onClick={showModalView("targets")}>Targets</SecondaryButton>
          <SecondaryButton action="alerts" onClick={showModalView("alerts")}>Alerts</SecondaryButton>
          <SecondaryButton action="saveReport" onClick={showModalView("saveReport")}>Save Report</SecondaryButton>
        </KpiGrid>

      </ScrollView>

      <View.BottomNav>
        <View.BottomNav.Button action="/report/groups" onClick={onNavbarClick} icon={<SolidReportIcon size={36} />}>Home</View.BottomNav.Button>
        <View.BottomNav.Button>Analytics</View.BottomNav.Button>
        <View.BottomNav.Button action="stores" icon={<StoreIcon size={32}/>} onClick={showModalView}>Stores</View.BottomNav.Button>
        <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
        <View.BottomNav.Button action="settings" icon={<SettingsIcon size={32} />} onClick={showModalView}>Settings</View.BottomNav.Button>
      </View.BottomNav>

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={()=> toggleModal()}>
        <ViewModalManager view={modalView} viewData={""} close={()=>toggleModal()} />
      </WEModal>
    </View>
  );
}

export default StoreReportsView;
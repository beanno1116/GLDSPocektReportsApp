
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import View from '../../Templates/View/View';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import DateUtility from '../../../Utils/DateUtils';
import { useApiClient } from '../../../Api/Api';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import FullScreenLoader from '../../../Components/Loader/FullScreenLoader';
import SolidReportIcon from '../../../assets/icons/SolidReportIcon';
import { useCallback, useRef, useState } from 'react';
import RefreshIndicator from '../../../Components/Loader/RefreshIndicator';
import WEModal from '../../../Components/WEModal/WEModal';
import useModal from '../../../Components/WEModal/hooks/useModal';
import PeriodSelector from '../../../Components/PeriodSelector/PeriodSelector';
import ViewModalManager from './Components/ViewModalManager';
import { viewAdapter } from './viewDataAdapter';
import StoreIcon from '../../../assets/icons/StoreIcon';
import ViewHeading from '../../../Components/Headings/ViewHeading';
import { viewQueries } from '../../../Api/Queries/StoreReportsViewQueries';
import useNavigateView from '../../../hooks/useNavigateView';
import DateRangeLabel from './Components/DateRangeLabel';
import useGlobalDate from '../../../hooks/useGlobalDate';
import useAppContext from '../../../hooks/useAppContext';
import SaleTotalsBarChart from './Components/Widgets/SaleTotalsBarChart';
import SalesKpiGrid from './Components/Widgets/SalesKpiGrid';
import MarkdownTotals from './Components/Widgets/MarkdownTotals';
import LoyaltyTotals from './Components/Widgets/LoyaltyTotals';
import CouponTotals from './Components/Widgets/CouponTotals';
import TaxTotals from './Components/Widgets/TaxTotals';
import ExceptionTotals from './Components/Widgets/ExceptionTotals';
import TransactionTotals from './Components/Widgets/TransactionTotals';
import ButtonGrid from './Components/Widgets/ButtonGrid';
import ToolGrid from './Components/Widgets/ToolGrid';
import { useSearchParams } from 'react-router';
import SafeDrawerButtonGrid from './Components/Widgets/SafeDrawerButtonGrid';
import ReportToolsButtonGrid from './Components/Widgets/ReportTools';
import useAppSettings from '../../../hooks/useAppSettings';
import Show from '../../../Components/Show/Show';


const reportWidgets = [
  {
    id: 1,
    order: 1,
    title: "This Week",
    source: "weekData",
    link: "SalesTotalsBarChart",
    name: 'SalesTotalsBarChart',
    Widget: SaleTotalsBarChart,
  },
  {
    id: 2,
    order: 2,
    title: "Sales",
    source: "salesData",
    link: "SalesTotals",
    name: 'SalesKpiGrid',
    Widget: SalesKpiGrid,
  },
  {
    id: 3,
    order: 3,
    title: "Markdowns",
    source: "markdownData",
    link: "MarkdownTotals",
    name: 'MarkdownTotals',
    Widget: MarkdownTotals,
  },
  {
    id: 4,
    order: 4,
    title: "Safe & Drawer",
    link: "SafeDrawer",
    name: 'ButtonGrid',
    Widget: SafeDrawerButtonGrid,
  },
  {
    id: 5,
    order: 5,
    title: "Loyalty",
    source: "loyaltyData",
    link: "LoyaltyTotals",
    name: 'LoyaltyTotals',
    Widget: LoyaltyTotals,
  },
  {
    id: 6,
    order: 6,
    title: "Coupons",
    source: "couponData",
    link: "CouponTotals",
    name: 'CouponTotals',
    Widget: CouponTotals,
  },
  {
    id: 8,
    order: 8,
    title: "Exceptions",
    source: "exceptionData",
    link: "ExceptionTotals",
    name: 'ExceptionTotals',
    Widget: ExceptionTotals,
  },
  {
    id: 10,
    order: 10,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ReportToolsButtonGrid',
    Widget: ReportToolsButtonGrid,
  },
  {
    id: 7,
    order: 7,
    title: "Taxes",
    source: "taxData",
    link: "TaxTotals",
    name: 'TaxTotals',
    Widget: TaxTotals,
  },
  {
    id: 9,
    order: 9,
    title: "Transactions",
    source: "transactionData",
    link: "TransactionTotals",
    name: 'TransactionTotals',
    Widget: TransactionTotals,
  },
  {
    id: 11,
    order: 10,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ToolGrid',
    Widget: ToolGrid,
  }
]



const useStoreReportsView = () => {
  const {state,dispatch} = useAppContext();
  const api = useApiClient();
  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigateView();
  const queryClient = useQueryClient();
  const {modalState,toggleModal} = useModal();
  const {dateRanges,setDateRanges,getDateRange} = useGlobalDate();
  const viewSettings = useAppSettings();
  // const {dateRanges,setDateRanges,getDateRange} = useGlobalDate(DateUtility.calculateDateRange(new Date(),"today"));
  

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
    setSearchParams({isOpen:true,view:route});
    viewRef.current = route;
    toggleModal();
  },[toggleModal])

  const closeModalView = () => {
    setSearchParams({});
    toggleModal();
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


  const onViewAllClick = (e,action) => {
    e.stopPropagation();
    navigate(action,{viewTransition:true});
  }

  return {
    dateRange: dateRanges.current,
    modalState,
    modalView: viewRef.current,
    navigate,
    onDateRangeChange,
    onNavbarClick,
    onPeriodChange,
    onViewAllClick,
    period: period.current,
    results,
    showModalView,
    closeModalView,
    viewSettings
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
    onViewAllClick,
    period,
    results,
    showModalView,
    closeModalView,
    viewSettings
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


  const viewData = viewAdapter(results.viewData[0],results.viewData[1],results.viewData[2]);


  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   

      <ViewHeading title={"Store Report"} onClick={onDateRangeChange} />

      <PeriodSelector currentPeriod={period} onClick={onPeriodChange}/>

      <DateRangeLabel start={dateRange.startDate} end={dateRange.endDate} m='1rem 0 0 0'/>

      <Show when={viewSettings.settings.length > 0} fallback={<div>No report widgets enabled. Select report widgets from the view settings.</div>}>
        <ScrollView>

          {viewSettings.settings.map(widget => {
            const Widget = widget.Widget;
            const source = widget.source;
            return (
              <Widget data={viewData[source]} onClick={onViewAllClick} title={widget.title} />
            )
          })}

        </ScrollView>
      </Show>


      <View.BottomNav>
        <View.BottomNav.Button action="/report/groups" onClick={onNavbarClick} icon={<SolidReportIcon size={36} />}>Home</View.BottomNav.Button>
        <View.BottomNav.Button>Analytics</View.BottomNav.Button>
        <View.BottomNav.Button action="stores" icon={<StoreIcon size={32}/>} onClick={showModalView}>Stores</View.BottomNav.Button>
        <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
        <View.BottomNav.Button action="settings" icon={<SettingsIcon size={32} />} onClick={showModalView}>Settings</View.BottomNav.Button>
      </View.BottomNav>

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={()=> closeModalView()}>
        <ViewModalManager view={modalView} viewData={""} close={()=>closeModalView()} />
      </WEModal>
    </View>
  );
}

export default StoreReportsView;
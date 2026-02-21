import { useCallback, useRef } from "react";
import BackIcon from "../../../assets/icons/BackIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import SolidDownloadIcon from "../../../assets/icons/SolidDownloadIcon";
import StoreIcon from "../../../assets/icons/StoreIcon";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ViewHeading from "../../../Components/Headings/ViewHeading";
import View from "../../Templates/View/View";
import useNavigateView from "../../../hooks/useNavigateView";
import viewQueries from "../../../Api/Queries/SafeReportViewQueries";
import RefreshIndicator from "../../../Components/Loader/RefreshIndicator";
import PeriodSelector from "../../../Components/PeriodSelector/PeriodSelector";
import FullScreenLoader from "../../../Components/Loader/FullScreenLoader";
import useAppContext from "../../../hooks/useAppContext";
import { useApiClient } from "../../../Api/Api";
import useGlobalDate from "../../../hooks/useGlobalDate";
import DateUtility from "../../../Utils/DateUtils";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import TierCard from "../../Templates/Components/Cards/TierCard";
import safeReportViewDataAdapter from "./Adapters/SafeReportViewDataAdapter";
import KpiGrid from "../../../Components/Grids/KpiGrid";
import Format from "../../../Utils/Format";
import WEModal from "../../../Components/WEModal/WEModal";
import ViewModalManager from "../StoreReports/Components/ViewModalManager";
import useModal from "../../../Components/WEModal/hooks/useModal";
import DateRangeLabel from "../StoreReports/Components/DateRangeLabel";


const useSafeReportsView = () => {
  const {state,dispatch} = useAppContext();
  const api = useApiClient();
  const navigate = useNavigateView();
  const queryClient = useQueryClient();
  const {dateRanges,setDateRanges,getDateRange} = useGlobalDate(DateUtility.calculateDateRange(new Date(),"today"));
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

    const period = useRef("today");

  const onNavbarClick = useCallback((route) => (e) => {
    navigate(route);
  },[navigate])

  const onReportDateChange = (dates) => {

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
  }

  return {
    dateRange: dateRanges.current,
    onNavbarClick,
    onReportDateChange,
    period: period.current,
    results
  }
}


const SafeReportsView = () => {
  const {dateRange,onNavbarClick,onReportDateChange,period,results} = useSafeReportsView();
  const {modalState,toggleModal} = useModal();

  const viewRef = useRef();

  const showModal = useCallback((action) => (e) => {
    
    viewRef.current = action;
    toggleModal();
  },[toggleModal])

  if (results.isFetching){
    return (
      <View>
        <RefreshIndicator when={results.isFetching} />   
        <ViewHeading title={"Safe Report"} onClick={() => {}} />

        {/* <PeriodSelector currentPeriod={period} onClick={() => {}}/> */}
        <FullScreenLoader text={"Loading Store Report Data"} />
      </View>
    )
  }
  


  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }


  const viewData = results.viewData;
  const tmp = safeReportViewDataAdapter(viewData);
  

  return (
    <View solid={true}>
      <ViewHeading title={"Safe Report"} onClick={onReportDateChange} />

      <DateRangeLabel start={dateRange.startDate} end={dateRange.endDate}/>

      <TierCard title={"💰 Current Status"} expected={Format.string(tmp.expectedTotal,Format.CURRENCY_FORMAT)} ending={Format.string(tmp.endingTotal,Format.CURRENCY_FORMAT)}/>

      <View.SectionTitle m='.5rem 0 .5rem 0'>Activity</View.SectionTitle>
      <KpiGrid>
        <KpiGrid.Item key={`safe_loan`} title={"Loans"} expandable={true} value={tmp.loanTotal} subValue={`${0}`} format={Format.NUMBER_FORMAT} />      
        <KpiGrid.Item key={`safe_deposits`} title={"Deposits"} value={tmp.depositTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />      
        <KpiGrid.Item key={`safe_pickups`} title={"Pickups"} value={tmp.pickupTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />      
        <KpiGrid.Item key={`safe_received`} title={"Received"} value={tmp.receivedTotal} subValue={`${0}`} format={Format.DECIMAL_FORMAT} />      
      </KpiGrid>
      
      <View.BottomNav>
        <View.BottomNav.Button action="/report/stores" onClick={onNavbarClick} icon={<BackIcon size={36} />}>Back</View.BottomNav.Button>
        <View.BottomNav.Button action="stores" onClick={showModal} icon={<StoreIcon size={36} />}>Export</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavbarClick} icon={<SolidDownloadIcon size={40} />}>Download</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavbarClick} icon={<SettingsIcon size={40} />}>Settings</View.BottomNav.Button>
      </View.BottomNav>


      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={()=> toggleModal()}>
        <ViewModalManager view={viewRef.current} viewData={""} close={()=>toggleModal()} />
      </WEModal>
    </View>
  );
}

export default SafeReportsView;
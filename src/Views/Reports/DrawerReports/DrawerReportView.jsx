import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../../Api/Api";
import BackIcon from "../../../assets/icons/BackIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import SolidDownloadIcon from "../../../assets/icons/SolidDownloadIcon";
import StoreIcon from "../../../assets/icons/StoreIcon";
import ViewHeading from "../../../Components/Headings/ViewHeading";
import WEModal from "../../../Components/WEModal/WEModal";
import useAppContext from "../../../hooks/useAppContext";
import useNavigateView from "../../../hooks/useNavigateView";
import Format from "../../../Utils/Format";
import View from "../../Templates/View/View";
import DateRangeLabel from "../StoreReports/Components/DateRangeLabel";
import ViewModalManager from "../StoreReports/Components/ViewModalManager";
import useGlobalDate from "../../../hooks/useGlobalDate";
import viewQueries from "../../../Api/Queries/SafeReportViewQueries";
import DateUtility from "../../../Utils/DateUtils";
import { useCallback, useRef } from "react";
import LoadingView from "./Components/LoadingView";
import ErrorView from "./Components/ErrorView";
import useModal from "../../../Components/WEModal/hooks/useModal";
import drawerReportViewDataAdapter from "./Adapters/drawerReportViewAdapter";
import MetricCard from "../../Templates/Components/Cards/MetricCard";
import ScrollView from "../../../Components/ScrollView/ScrollView";
import DrawerReportTabView from "./Components/DrawerReportTabView";
import ReportToolsButtonGrid from "../StoreReports/Components/Widgets/ReportTools";

const useDrawerReportView = () => {
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

const DrawerReportView = () => {
  const {dateRange,onNavbarClick,onReportDateChange,period,results} = useDrawerReportView();
  const {modalState,toggleModal} = useModal();

  const viewRef = useRef();

  const showModal = useCallback((action) => (e) => {
    
    viewRef.current = action;
    toggleModal();
  },[toggleModal])

  if (results.isFetching){
    return (
      <LoadingView text={"Drawer"} />
    )
  }
  


  if (results.isError){
    return (
      <ErrorView />
    )
  }


  const viewData = results.viewData;
  const drawerData = drawerReportViewDataAdapter(viewData);

  const onClick =(e) =>{

  }

  return (
    <View solid={true}>
      <ViewHeading title={"Drawer Report"} onClick={onReportDateChange} />

      <DateRangeLabel start={dateRange.startDate} end={dateRange.endDate}/>

      <ScrollView>
        <MetricCard m="2rem 0" accent="platinum">
        <MetricCard.Header title={"Top Tender"} icon={"💰"} />
        <MetricCard.Title text={drawerData.topTender.description} />
        <MetricCard.Value value={Format.string(drawerData.topTender.total,Format.CURRENCY_FORMAT)} />
        <MetricCard.Footer delta={"15%"} period={"vs last week"} />
      </MetricCard>

      
        <View.SectionTitle m='0rem 0 .5rem 0'>Lanes</View.SectionTitle>
        <DrawerReportTabView />
   
        <View.SectionTitle m='1.75rem 0 .5rem 0'>Store</View.SectionTitle>
        

        <ReportToolsButtonGrid title={"Report Tools"} onClick={onClick} />
        
      </ScrollView>

      


   
      
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

export default DrawerReportView;
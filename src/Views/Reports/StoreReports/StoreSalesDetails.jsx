import { useNavigate } from "react-router";
import BackIcon from "../../../assets/icons/BackIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import SolidDownloadIcon from "../../../assets/icons/SolidDownloadIcon";
import ScrollView from "../../../Components/ScrollView/ScrollView";
import View from "../../Templates/View/View";
import { Bar, BarChart, Cell, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import DateUtility from "../../../Utils/DateUtils";
import { useApiClient } from "../../../Api/Api";
import { useCallback, useRef, useState } from "react";
import FullScreenLoader from "../../../Components/Loader/FullScreenLoader";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import salesViewAdapter from "./Adapters/SalesViewDataAdapter";
import styles from './storeReportsView.module.css';
import KpiGrid from "../../../Components/Grids/KpiGrid";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import StoreIcon from "../../../assets/icons/StoreIcon";
import WEModal from "../../../Components/WEModal/WEModal";
import ModalViewManager from "../Components/ModalViewManager";
import useModal from "../../../Components/WEModal/hooks/useModal";
import SalesReportBuilder from "../Forms/SalesReportBuilder";
import StoreSelector from "../../../Modals/StoreSelector";
import ScrollSelector from "../../../Components/ScrollSelector/ScrollSelector";
import ViewHeading from "../../../Components/Headings/ViewHeading";
import DateRangeLabel from "./Components/DateRangeLabel";
import { viewQueries } from "../../../Api/Queries/StoreSalesDetailsViewQueries";
import SalesTenderReportBuilder from "../Forms/SalesTenderReportBuilder";
import TenderSalesWidget from "./SalesDetailsView/Components/TenderSalesWidget";
import DepartmentSalesWidget from "./SalesDetailsView/Components/DepartmentSalesWidget";
import OtherSalesWidget from "./SalesDetailsView/Components/OtherSalesWidget";
import SalesTrendsWidget from "./SalesDetailsView/Components/SalesTrendsWidget";
import SalesDetailsWidget from "./SalesDetailsView/Components/SalesDetailsWidget";
import useGlobalDate from "../../../hooks/useGlobalDate";
import SalesHourlyReportBuilder from "../Forms/SalesHourlyReportBuilder";
import useAppContext from "../../../hooks/useAppContext";
import ReportBuilder from "../../ReportBuilder/ReportBuilder";


const subViews = {
  sales: SalesReportBuilder,
  hourly: ReportBuilder,
  tender: ReportBuilder,
  balance: ReportBuilder,
  store: ReportBuilder,
  stores: StoreSelector
}



const useStoreSalesDetailsView = () => {
  const {state,dispatch} = useAppContext()
  const navigate = useNavigate();
  const api = useApiClient();
  const queryClient = useQueryClient();
  const {dateRanges,setDateRanges} = useGlobalDate();


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
        // 
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
          viewQueries(dateRanges,["dfdd44e8-be22-43ef-8313-95f2d1904566"]).forEach(query => {
            queryClient.invalidateQueries({queryKey:query.key})
          })
        }
      };
    }
  })

  const onNavClick = useCallback((route) => (e) => {
    navigate(route,{viewTransition:true});
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
  const onCreateButtonClick = (e) => {

  }

  return {
    dateRange: dateRanges.current,
    results,
    onNavClick,
    onReportDateChange,
  }
}



const StoreSalesDetails = ({ ...props }) => {
  const {results,onNavClick,onReportDateChange,dateRange} = useStoreSalesDetailsView();
  const {modalState,toggleModal} = useModal();


  const viewRef = useRef("");

  const onCreateButtonClick = useCallback((action) => (e) => {
    if (!e?.currentTarget) return;
    
    // const button = e.currentTarget;
    // const action = button.dataset.action;
    viewRef.current = action;
    toggleModal();
  },[toggleModal])



  if (results.isLoading){
    return (
            <View>
        
      
      <ViewHeading title={"Store Sales"} subtitle={"Kings Liquor store"} onClick={onReportDateChange}/>

        <div className={styles.report_meta}>
        <ScrollSelector.BadgeItem active={true} text={"Sales"} link={"#details"} /> 
        <ScrollSelector.BadgeItem text={"Trends"} link={"#trends"} /> 
        <ScrollSelector.BadgeItem text={"Tenders"} link={"#tender"} /> 
        <ScrollSelector.BadgeItem text={"Depts"} link={"#department"} /> 
      </div>
        <FullScreenLoader text={"Loading Store Report Data"} />
      </View>
    )
  }

  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }
  const {hourlyData,balanceSheet,departmentSales,sevenDayTotalSales} = salesViewAdapter(results.viewData);
  // 
  


  
  
  return (
    <View>

      <ViewHeading title={"Store Sales"} onClick={onReportDateChange}/>
      
      <div className={styles.report_meta}>
        <ScrollSelector.BadgeItem active={true} text={"Sales"} link={"#details"} /> 
        <ScrollSelector.BadgeItem text={"Trends"} link={"#trends"} /> 
        <ScrollSelector.BadgeItem text={"Tenders"} link={"#tender"} /> 
        <ScrollSelector.BadgeItem text={"Depts"} link={"#department"} /> 
      </div>

      <DateRangeLabel start={dateRange.startDate} end={dateRange.endDate}/>

      <ScrollView>

        <SalesDetailsWidget reportData={{balanceSheet,hourlyData,departmentSales,sevenDayTotalSales}} balanceSheet={balanceSheet} chartData={sevenDayTotalSales}>
          <PrimaryButton action="sales" onClick={onCreateButtonClick("sales")}>Create Sales Report</PrimaryButton>
        </SalesDetailsWidget>

        <SalesTrendsWidget hourlyData={hourlyData}>
          <PrimaryButton action="hourly" onClick={onCreateButtonClick("hourly")}>Create Hourly Report</PrimaryButton>
        </SalesTrendsWidget>

        <TenderSalesWidget tenderData={balanceSheet.tendered}>
          <PrimaryButton action="tender" onClick={onCreateButtonClick("tender")}>Create Tender Report</PrimaryButton>
        </TenderSalesWidget>
        
        <DepartmentSalesWidget departmentData={departmentSales} />

        <OtherSalesWidget balanceSheet={balanceSheet} />



        <View.SectionTitle id="reportActions" m='.5rem 0'>Create Reports</View.SectionTitle>
        <KpiGrid>
          <SecondaryButton>Balance Sheet</SecondaryButton>
          <SecondaryButton>Store</SecondaryButton>
          <SecondaryButton>Hourly</SecondaryButton>
          <SecondaryButton>Tender</SecondaryButton>
        </KpiGrid>

      </ScrollView>

      <View.BottomNav>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<BackIcon size={36} />}>Back</View.BottomNav.Button>
        <View.BottomNav.Button action="stores" onClick={onCreateButtonClick} icon={<StoreIcon size={36} />}>Export</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SolidDownloadIcon size={40} />}>Download</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SettingsIcon size={40} />}>Settings</View.BottomNav.Button>
      </View.BottomNav>

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={() => toggleModal()}>
        <ModalViewManager view={viewRef.current} views={subViews} close={toggleModal} data={{hourlyData,balanceSheet,departmentSales,sevenDayTotalSales}}/>
      </WEModal>

    </View>
  );
}

export default StoreSalesDetails;
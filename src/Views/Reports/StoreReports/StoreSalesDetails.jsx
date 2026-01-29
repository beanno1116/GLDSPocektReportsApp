import { useNavigate } from "react-router";
import BackIcon from "../../../assets/icons/BackIcon";
import ExportIcon from "../../../assets/icons/ExportIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import SolidDownloadIcon from "../../../assets/icons/SolidDownloadIcon";
import FlexColumn from "../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../Components/FlexComponents/FlexRow";
import ScrollView from "../../../Components/ScrollView/ScrollView";
import View from "../../Templates/View/View";
import ReportHero from "../Components/ReportHero/ReportHero";
import { Bar, BarChart, Cell, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import SplitButton from "../../../Components/Buttons/SplitButton";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import Format from "../../../Utils/Format";
import DateUtility from "../../../Utils/DateUtils";
import LocDataAdapter from "../../../Models/LocReportAdapter";
import { useApiClient } from "../../../Api/Api";
import { useCallback } from "react";
import FullScreenLoader from "../../../Components/Loader/FullScreenLoader";
import TrendCard from "../../Templates/Components/Cards/TrendCard";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import salesViewAdapter from "./Adapters/SalesViewDataAdapter";
import HourlyLineChart from "./Components/Charts/Hourly/HourlyLineChart";
import TenderPieChart from "./Components/Charts/Tender/TenderPieChart";
import DepartmentRadarChart from "./Components/Charts/Department/DepartmentRadarChart";
import styles from './storeReportsView.module.css';
import WEAccordion from "../../../Components/WEAccordion/WEAccordion";
import HeaderLabel from "../../../Components/Labels/HeaderLabel";
import KpiGrid from "../../../Components/Grids/KpiGrid";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";
import StoreIcon from "../../../assets/icons/StoreIcon";
import WEModal from "../../../Components/WEModal/WEModal";
import ModalViewManager from "../Components/ModalViewManager";
import useModal from "../../../Components/WEModal/hooks/useModal";
import Sort from "../../../Utils/Sort";

const data = [
  {
    name: 'Sun',
    total: 4000,
    quantity: 400
  },
  {
    name: 'Mon',
    total: 3000,
    quantity: 398    
  },
  {
    name: 'Tue',
    total: 2000,
    quantity: 80    
  },
  {
    name: 'Wed',
    total: 2780,
    quantity: 390
  },
  {
    name: 'Thu',
    total: 1890,
    quantity: 48
  },
  {
    name: 'Fri',
    total: 2390,
    quantity: 38
  },
  {
    name: 'Sat',
    total: 3490,
    quantity: 430
  },
];


const hourData = [
  {
    name: '8',
    total: 4000,
    quantity: 400
  },
  {
    name: '9',
    total: 3000,
    quantity: 398    
  },
  {
    name: '10',
    total: 2000,
    quantity: 80    
  },
  {
    name: '11',
    total: 2780,
    quantity: 390
  },
  {
    name: '12',
    total: 1890,
    quantity: 48
  },
  {
    name: '13',
    total: 2390,
    quantity: 38
  },
  {
    name: '14',
    total: 3490,
    quantity: 430
  },
  {
    name: '15',
    total: 4715,
    quantity: 430
  },
  {
    name: '16',
    total: 3841,
    quantity: 430
  },
  {
    name: '17',
    total: 2921,
    quantity: 430
  },
  {
    name: '18',
    total: 4295,
    quantity: 430
  }
];


const BarChartView = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      barGap={0}
      barCategoryGap={4}
      margin={{
        top: 0,
        right: 5,
        left: 5,
        bottom: 0,
      }}>
      {/* <CartesianGrid /> */}
      <XAxis dataKey="name" />
      <YAxis width="auto"  mirror={true} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false}/>
      <Tooltip />
      {/* <Legend /> */}
      <Bar type="monotone" dataKey="total" fill="#8884d8" radius={[10, 10, 0, 0]}>
        {data.map((entry, index) => (
  <>
   <defs>
    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
     <stop offset='0' stopColor='#00d4ff' />
     <stop offset='1' stopColor="#00ff88" />
     </linearGradient>
    </defs>
    <Cell key={`cell-${index}`} fill='url(#colorUv)' />
   </>
  ))}
      </Bar>
    </BarChart>
  )
}

const viewQueries = [
  {
    action: "HourlySales",
    key: `hourlysales`,
    posFields: {
      startDate: Format.toRequestDateFormat(new Date()),
      endDate: Format.toRequestDateFormat(new Date())
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseHourlySales(data);
      return adaptedData;
    }
  },
  {
    action: "HourlySales",
    key: `hourlysales_base`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setYearBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseHourlySales(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    key: `departmenttotals`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    key: `departmenttotals_base`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data);
      return adaptedData;
    }
  },
  {
    action: "BalanceSheet",
    key: `balancesheet`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
      return adaptedData;
    }
  },
]


const useStoreSalesDetailsView = () => {
  const navigate = useNavigate();
  const api = useApiClient();
  const queryClient = useQueryClient();

  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        // 
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: query.posFields
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
          viewQueries.forEach(query => {
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })

  const onNavClick = useCallback((route) => (e) => {
    navigate(route,{viewTransition:true});
  },[navigate])

  const onCreateButtonClick = (e) => {

  }

  return {
    results,
    onNavClick
  }
}



const StoreSalesDetails = ({ ...props }) => {
  const {results,onNavClick} = useStoreSalesDetailsView();
  const {modalState,toggleModal} = useModal();

  if (results.isLoading){
    return (
      <FullScreenLoader text={"Loading Store Sales Data"} />
    )
  }

  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }
  const {hourlyData,balanceSheet,departmentSales} = salesViewAdapter(results.viewData);
  // debugger;


  const onCreateButtonClick = (e) => {
    toggleModal();
  }
  
  return (
    <View>
      <FlexColumn height="100%">        

        <ReportHero title={"Store Sales Report"} badge={"Store Sales"} period={"Jan 2026"}  />

        <FlexRow flex="1">
          <ScrollView type="absolute">


            <View.SectionTitle id="details" m='.5rem 0'>Sales Details</View.SectionTitle>
            <TrendCard>
              <FlexRow p="0 0 1rem 0">
                <FlexRow hAlign="space-between" vAlign="center" p="0 0 0 .5rem">
                  <span style={{fontSize:"18px",fontWeight:"700"}}>Total Sales</span>
                  <SplitButton label={"Today"} items={["Today","Week","Month","YTD"]} mode="select"/>
                </FlexRow>
              </FlexRow>
              <BarChartView />
              <WEAccordion>
                <WEAccordion.Panel>
                  <WEAccordion.Panel.Header>
                    <h3>View Sales Totals</h3>
                    {/* <HeaderLabel text={"View Sales Totals"} /> */}
                    {/* <SubLabel text={subtitle === "" ? "" : `Ending: $${handleZeroValue(subtitle)}`} /> */}
                  </WEAccordion.Panel.Header>
                  <WEAccordion.Panel.Content>
                    {Sort.bySales(balanceSheet.Sales).map(sale => {
                      return (
                        <div className={styles.sub_item}>
                          <span>💵 {sale.description}</span>
                          <span>{Format.string(sale.total,"currency")}</span>
                        </div>
                      )
                    })}
                  </WEAccordion.Panel.Content>
                </WEAccordion.Panel>
              </WEAccordion>
              <FlexRow p="1rem 0 0 0">
                <PrimaryButton action="sales" onClick={onCreateButtonClick}>Create Sales Report</PrimaryButton>
              </FlexRow>
            </TrendCard>
            

            <View.SectionTitle id="trends" m='.5rem 0'>Sales Trends</View.SectionTitle>
            <HourlyLineChart chartData={hourlyData} />


            <View.SectionTitle id="tender" m='.5rem 0'>Sales Tenders</View.SectionTitle>
            <TenderPieChart chartData={balanceSheet.Tendered} />

            <View.SectionTitle id="department" m='.5rem 0'>Department Sales</View.SectionTitle>
            <DepartmentRadarChart chartData={departmentSales} />

            <View.SectionTitle id="department" m='.5rem 0'>Other</View.SectionTitle>
            <TrendCard>
              {[...balanceSheet.Plus,...balanceSheet.RBSLynkISO].map(data => {
                return (
                  <div className={styles.sub_item}>
                      <span>💵 {data.description}</span>
                      <span>${data.total}</span>
                    </div>
                )
              })}
            </TrendCard>


            <View.SectionTitle id="reportActions" m='.5rem 0'>Create Reports</View.SectionTitle>
            <KpiGrid>
              <SecondaryButton>Balance Sheet</SecondaryButton>
              <SecondaryButton>Store</SecondaryButton>
              <SecondaryButton>Hourly</SecondaryButton>
              <SecondaryButton>Tender</SecondaryButton>
            </KpiGrid>

            <div style={{height:"75px",width:"100%"}}></div>
          </ScrollView>
        </FlexRow>
      </FlexColumn>

      <View.BottomNav>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<BackIcon size={36} />}>Back</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<StoreIcon size={36} />}>Export</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SolidDownloadIcon size={40} />}>Download</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SettingsIcon size={40} />}>Settings</View.BottomNav.Button>
      </View.BottomNav>

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={() => toggleModal()}>
        <ModalViewManager view={"sales"} close={toggleModal} data={{hourlyData,balanceSheet,departmentSales}}/>
      </WEModal>

    </View>
  );
}

export default StoreSalesDetails;
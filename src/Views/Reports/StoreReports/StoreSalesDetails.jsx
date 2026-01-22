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
import HeaderNav from "../../Templates/View/Components/HeaderNav";
import KpiGrid from "../../../Components/Grids/KpiGrid";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../../Templates/Components/Cards/Card";
import SplitButton from "../../../Components/Buttons/SplitButton";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import Format from "../../../Utils/Format";
import DateUtility from "../../../Utils/DateUtils";
import LocDataAdapter from "../../../Models/LocReportAdapter";
import { useApiClient } from "../../../Api/Api";
import { useCallback } from "react";
import FullScreenLoader from "../../../Components/Loader/FullScreenLoader";
import Sort from "../../../Utils/Sort";
import TrendCard from "../../Templates/Components/Cards/TrendCard";
import LineLabel from "../../../Components/Labels/LineLabel";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

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

const LineChartView = () => {
  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={hourData}
      margin={{
        top: 0,
        right: 5,
        left: 5,
        bottom: 0,
      }}
    >
       <XAxis dataKey="name" />
      {/* <YAxis width="auto" /> */}
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8" isAnimationActive={true} />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" isAnimationActive={isAnimationActive} /> */}
    </LineChart>
  )
}
const viewQueries = [
  {
    action: "HourlySales",
    key: `hourlysales`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseHourlySales(data);
      return adaptedData;
    }
  }
]


const useStoreSalesDetailsView = () => {
  const navigate = useNavigate();
  const api = useApiClient();
  const queryClient = useQueryClient();

  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        // debugger;
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: query.posFields
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson});
        // debugger;
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

  return {
    results,
    onNavClick
  }
}



const StoreSalesDetails = ({ ...props }) => {
  const {results,onNavClick} = useStoreSalesDetailsView();

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

  const data = results.viewData[0];

  const unSortedHourlySales = data.totalSales;
  const sortedHourlySales = Sort.hourlySales(data.totalSales);
  const hour = parseInt(sortedHourlySales[0].hour) - 12;
  const hourConstraint = hour + 1;
  debugger;

  return (
    <View>
      {/* <HeaderNav title="Store Loyalty" /> */}
      <FlexColumn height="100%">

        <ReportHero title={"Store Sales Report"} badge={"Store Sales"} period={"Jan 2026"} description={"View your store sales data from all angles and gather insite about trends and store performance"} />

        <FlexRow flex="1">
          <ScrollView type="absolute">

            <Card>
              <FlexRow p="0 0 1rem 0">
                <FlexRow hAlign="space-between" vAlign="center" p="0 0 0 .5rem">
                  <span style={{fontSize:"18px",fontWeight:"700"}}>Total Sales</span>
                  <SplitButton label={"Today"} items={["Today","Week","Month","YTD"]} />
                </FlexRow>
              </FlexRow>
              <BarChartView />
            </Card>

            <View.SectionTitle m='.5rem 0'>Sales Trends</View.SectionTitle>
            <TrendCard>
              <FlexRow hAlign="space-between" vAlign="center" p="0 0 1.5rem .5rem">
                <FlexRow flex="1">
                  <h2>Hourly</h2>
                </FlexRow>
                <FlexRow flex="1" hAlign="flex-end">
                  <SplitButton label="Sales" items={["Sales","Items","Transactions","Basket"]} />
                </FlexRow>
              </FlexRow>
              {/* <FlexRow hAlign="center">Overall</FlexRow> */}
              <LineChartView />
              <LineLabel label={"Busiest Period"} value={"4pm-5pm"} />
              <LineLabel label={"Slowest Period"} value={"4pm-5pm"} type="negative"/>
              <FlexRow p="1rem 0 0 0">
                <PrimaryButton>Generate Hourly Report</PrimaryButton>
              </FlexRow>
            </TrendCard>


            <div style={{height:"75px",width:"100%"}}></div>
          </ScrollView>
        </FlexRow>
      </FlexColumn>

      <View.BottomNav>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<BackIcon size={36} />}>Back</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<ExportIcon size={36} />}>Export</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SolidDownloadIcon size={40} />}>Download</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onNavClick} icon={<SettingsIcon size={40} />}>Settings</View.BottomNav.Button>
      </View.BottomNav>

    </View>
  );
}

export default StoreSalesDetails;
import TabView from "../../../../Components/TabView/TabView";
import WeeklySalesChart from "./WeeklySalesChart";
import styles from '../storeReportsView.module.css'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";

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

const BarChartView = ({chartData}) => {
  const barColors = [ '#4c5f7c', '#dc2424', '#fcda00', '#8383ba', '#23dbbd' ];

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
      barGap={0}
      barCategoryGap={4}
      margin={{
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
      }}>
      {/* <CartesianGrid /> */}
      <XAxis dataKey="name" />
      <YAxis width="auto"  mirror={true} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false}/>
      <Tooltip />
      {/* <Legend /> */}
      <Bar type="monotone" dataKey="thisWeekSales" fill="#8884d8" radius={[10, 10, 0, 0]}>
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


const ChartTabView = ({ chartData,...props }) => {
  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "revenue":        
        return (<BarChartView chartData={chartData}/>)
      case "net sales":
        // return (<WeeklySalesChart />);
        return (<BarChartView chartData={chartData}/>)
      default:
        return (<div style={{color:"snow"}}>Information tab view</div>);
    }
  }

  return (
    <TabView 
      tabs={["revenue","net sales"]}
      getTab={getTab}
      renderTabView={renderTabView}
    />
  )
}

export default ChartTabView;
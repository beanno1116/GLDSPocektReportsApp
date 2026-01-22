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

const BarChartView = () => {
  const barColors = [ '#4c5f7c', '#dc2424', '#fcda00', '#8383ba', '#23dbbd' ];

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', aspectRatio: 1.618 }}
      responsive
      data={data}
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


const ChartTabView = ({ ...props }) => {
  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "all":        
        return (        <div className={styles.chart_section}>
          <div className={styles.chart_header}>
            <div className={styles.chart_title}>All Sales</div>
            <div className={styles.chart_period}>Weekly Sales</div>
          </div>
          <div className={styles.chart_bars}>
            <div className={styles.chart_bar} style={{height:" 58%"}}></div>
            <div className={styles.chart_bar} style={{height:" 72%"}}></div>
            <div className={styles.chart_bar} style={{height:" 65%"}}></div>
            <div className={styles.chart_bar} style={{height:" 88%"}}></div>
            <div className={styles.chart_bar} style={{height:" 94%"}}></div>
            <div className={styles.chart_bar} style={{height:" 100%"}}></div>
            <div className={styles.chart_bar} style={{height:" 76%"}}></div>
          </div>

          <div className={styles.chart_labels}>
                <div className={styles.chart_label}>MON</div>
                <div className={styles.chart_label}>TUE</div>
                <div className={styles.chart_label}>WED</div>
                <div className={styles.chart_label}>THU</div>
                <div className={styles.chart_label}>FRI</div>
                <div className={styles.chart_label}>SAT</div>
                <div className={styles.chart_label}>SUN</div>
            </div>
        </div>);        
      case "revenue":
        // return (<WeeklySalesChart />);
        return (<BarChartView />)
      default:
        return (<div style={{color:"snow"}}>Information tab view</div>);
    }
  }

  return (
    <TabView 
      tabs={["all","revenue"]}
      getTab={getTab}
      renderTabView={renderTabView}
    />
  )
}

export default ChartTabView;
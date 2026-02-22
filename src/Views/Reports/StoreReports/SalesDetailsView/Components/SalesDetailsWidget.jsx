
import { Bar, BarChart, Cell, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import FlexRow from '../../../../../Components/FlexComponents/FlexRow';
import TrendCard from '../../../../Templates/Components/Cards/TrendCard';
import View from '../../../../Templates/View/View';
import WEAccordion from '../../../../../Components/WEAccordion/WEAccordion';
import PrimaryButton from '../../../../../Components/Buttons/PrimaryButton';
import SplitButton from '../../../../../Components/Buttons/SplitButton';
import Sort from '../../../../../Utils/Sort';
import Format from '../../../../../Utils/Format';
import styles from '../../storeReportsView.module.css'
import { useState } from 'react';
import Show from '../../../../../Components/Show/Show';
import { salesChartSpans } from '../../../../../AppData/Menu/MenuItems';

const chartDataData = [
  {
    name: 'Sun',
    total: 0,
    quantity: 0
  },
  {
    name: 'Mon',
    total: 0,
    quantity: 0    
  },
  {
    name: 'Tue',
    total: 0,
    quantity: 0    
  },
  {
    name: 'Wed',
    total: 0,
    quantity: 0
  },
  {
    name: 'Thu',
    total: 0,
    quantity: 0
  },
  {
    name: 'Fri',
    total: 0,
    quantity: 0
  },
  {
    name: 'Sat',
    total: 0,
    quantity: 0
  },
];

const formatHour = (hour) => {
  const hourAsInt = parseInt(hour);
  if (hourAsInt > 12){
    return hour % 12;
  }
  return hourAsInt;
}

const formatTimeSpan = (hour) => {
  const hourAsInt = parseInt(hour);
  const endHourAsInt = hourAsInt + 1;
  const period = hourAsInt >= 12 ? "pm" : "am";
  const endPeriod = endHourAsInt >= 12 ? "pm" : "am";
  return `${formatHour(hourAsInt)}${period} - ${formatHour(endHourAsInt)}${endPeriod}`;
}

const BarChartView = ({chartData=chartDataData}) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
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
        {chartData.map((entry, index) => (
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

const LineChartView = ({chartData}) => {

  if (!chartData){
    return (
      <div>No data found!</div>
    )
  }
  
  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={Sort.byHour(chartData).map(d => {
            return {
              ...d,
              hour: formatHour(d.hour)
            }
          })}
      margin={{
        top: 0,
        right: 5,
        left: 5,
        bottom: 0,
      }}
    >
       <XAxis dataKey="hour" interval={"preserveStartEnd"} />
      {/* <YAxis width="auto" /> */}
      <Tooltip />
      <Legend />
      <Line type="monotone" name='Hourly Sales' dataKey="current" stroke="#00ff88ad" fill='#00ff88' strokeWidth={3} isAnimationActive={true} />
    </LineChart>
  )
}

const SalesDetailsWidget = ({ reportData,balanceSheet,chartData,children }) => {
  const [dataType,setDataType] = useState("Today");
  const {hourlyData,sevenDayTotalSales} = reportData;

  const onTypeChange = (e,action) => {
    setDataType(action);
    
    console.log(action);

  }

  const renderChartView = (dataType) => {
    
    switch (dataType.toLowerCase()) {
      case "today":
        return <LineChartView chartData={hourlyData?.totalSales?.data} />
      case "week":
        return <BarChartView chartData={chartData} />
      case "month":
        return <div>Month to date bar chart</div>
      case "ytd":
        return <div>Year to date bar chart</div>
    
      default:
        break;
    }
  }

  return (
    <>
      <View.SectionTitle id="details" m="2rem 0 .5rem 0">Sales Details</View.SectionTitle>
      <Show when={balanceSheet?.sales} fallback={<div>No data found!</div>}>
        <TrendCard>
          <FlexRow p="0 0 1.5rem 0">
            <FlexRow hAlign="space-between" vAlign="center" p="0 0 0 .5rem">
              <span style={{fontSize:"18px",fontWeight:"700"}}>Total Sales</span>
              <SplitButton label={"Today"} items={salesChartSpans} mode="select" onSelection={onTypeChange}/>
            </FlexRow>
          </FlexRow>
          {renderChartView(dataType)}
          {/* <BarChartView chartData={chartData} /> */}
          <WEAccordion m='.5rem 0 0 0'>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <h3>Store Sales Totals</h3>
              </WEAccordion.Panel.Header>
              <WEAccordion.Panel.Content>
                {!balanceSheet?.sales && <div>No data found!</div>}
                {balanceSheet?.sales && Sort.bySales(balanceSheet.sales).map(sale => {
                  return (
                    <div key={sale.description} className={styles.sub_item}>
                      <span>💵 {sale.description}</span>
                      <span>{Format.string(sale.total,"currency")}</span>
                    </div>
                  )
                })}
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
          </WEAccordion>
          <FlexRow p="1rem 0 0 0">
            {children}
          </FlexRow>
        </TrendCard>
      </Show>
    </>
  );
}

export default SalesDetailsWidget;

import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import SplitButton from '../../../../../Components/Buttons/SplitButton';
import FlexRow from '../../../../../Components/FlexComponents/FlexRow';
import LineLabel from '../../../../../Components/Labels/LineLabel';
import Show from '../../../../../Components/Show/Show';
import Format from '../../../../../Utils/Format';
import Sort from '../../../../../Utils/Sort';
import TrendCard from '../../../../Templates/Components/Cards/TrendCard';
import View from '../../../../Templates/View/View';
import HourlyLineChart from '../../Components/Charts/Hourly/HourlyLineChart';
import { useState } from 'react';

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

const LineChartView = ({data}) => {
  
  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={Sort.byHour(data).map(d => {
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
      <Line type="monotone" name='Avg' dataKey="base" stroke="#00ff88ad" fill='#00ff88' strokeWidth={3} isAnimationActive={true} />
      <Line type="monotone" name="Today" dataKey="current" stroke="#ff00ffae" fill='#ff00ff' strokeWidth={3} isAnimationActive={true} />
    </LineChart>
  )
}

const actionMapping = {
  "Sales": "totalSales",
  "Items": "items",
  "Transactions": "transactions",
  "Basket": "basket"
}

const SalesTrendsWidget = ({ hourlyData,children }) => {

  const [currentData,setCurrentData] = useState(hourlyData?.totalSales ? hourlyData.totalSales : []);
  const {max,min,data} = currentData;

  const onTypeChange = (e,action) => {
    
    setCurrentData(hourlyData[actionMapping[action]]);
    console.log(action);

  }
  return (
    <>
      <View.SectionTitle id="trends" m='.5rem 0'>Sales Trends</View.SectionTitle>
      <Show when={hourlyData} fallback={<div>No data found!</div>}>
        <TrendCard>
          <FlexRow hAlign="space-between" vAlign="center" p="0 0 1.5rem .5rem">
            <FlexRow flex="1">
              <h2>Hourly</h2>
            </FlexRow>
            <FlexRow flex="1" hAlign="flex-end">
              <SplitButton label="Sales" items={["Sales","Items","Transactions","Basket"]} onSelection={onTypeChange} mode="select" />
            </FlexRow>
          </FlexRow>
          {/* <FlexRow hAlign="center">Overall</FlexRow> */}
          <LineChartView data={data} />
          {
            (max && min) && 
            (
              <>
              <LineLabel text={"Busiest Period"} subtext={formatTimeSpan(max.hour)} value={Format.string(max.total,max.format)} />
              <LineLabel text={"Slowest Period"} subtext={formatTimeSpan(min.hour)} value={Format.string(min.total,min.format)} type="negative"/>
              </>
            )
          }
          <FlexRow p="1rem 0 0 0">
            {children}
          </FlexRow>
        </TrendCard>
      </Show>
    </>
  );
}

export default SalesTrendsWidget;
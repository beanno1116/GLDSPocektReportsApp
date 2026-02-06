
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import PrimaryButton from '../../../../../../Components/Buttons/PrimaryButton';
import SplitButton from '../../../../../../Components/Buttons/SplitButton';
import FlexRow from '../../../../../../Components/FlexComponents/FlexRow';
import LineLabel from '../../../../../../Components/Labels/LineLabel';
import TrendCard from '../../../../../Templates/Components/Cards/TrendCard';
import Sort from '../../../../../../Utils/Sort';
import Format from '../../../../../../Utils/Format';
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
      data={data}
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

const HourlyLineChart = ({ chartData }) => {
  const [currentData,setCurrentData] = useState(chartData?.totalSales ? chartData.totalSales : []);
  const {max,min,data} = currentData;

  const onTypeChange = (e,action) => {
    
    setCurrentData(chartData[actionMapping[action]]);
    console.log(action);

  }

  return (
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
      <LineChartView data={Sort.byHour(data).map(d => {
        return {
          ...d,
          hour: formatHour(d.hour)
        }
      })} />
      <LineLabel text={"Busiest Period"} subtext={formatTimeSpan(max.hour)} value={Format.string(max.total,max.format)} />
      <LineLabel text={"Slowest Period"} subtext={formatTimeSpan(min.hour)} value={Format.string(min.total,min.format)} type="negative"/>
      <FlexRow p="1rem 0 0 0">
        <PrimaryButton>Create Hourly Report</PrimaryButton>
      </FlexRow>
    </TrendCard>
  );
}

export default HourlyLineChart;
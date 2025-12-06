
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Mutate from '../../../../Utils/Mutate';
import useChartComponent from '../../../../hooks/useChartComponent';
import RefreshIcon from '../../../../assets/icons/RefreshIcon';
import QVReport from '../Template/QVReport';
import { useEffect } from 'react';
import { subscribe, unsubscribe } from '../../../../events';
import { useQueryClient } from '@tanstack/react-query';
import useAppContext from '../../../../hooks/useAppContext';


const ThisWeekVsLast = ({ title }) => {
  const {state} = useAppContext();
  const {status,parseChartData} = useChartComponent("CurrentVsLastWeek",Mutate.thisWeekVsLastWeekData);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleRefreshEvent = (e) => {
      try {        
        queryClient.invalidateQueries({queryKey:["CurrentVsLastWeek",state.agentString]});
      } catch (error) {
        console.error(error.message);
      }
    }
    subscribe("onqvrefresh",handleRefreshEvent);
    return () => {
      unsubscribe("onqvrefresh",handleRefreshEvent);
    }
  })

  return (
    <QVReport status={status}>
      <QVReport.Title mode="lite" text={title} />
      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={parseChartData()} margin={{top:0,right:0,left:-25,bottom:0}}>
          <Tooltip />
          <Line type="monotone" dataKey="thisWeekSales" stroke="#ff0fef" fill='#ff0fef' strokeWidth={4} />              
          <Line type="monotone" dataKey="lastWeekSales" stroke="#82ca9d" fill='#82ca9d' strokeWidth={4} />              
          <XAxis dataKey="name" stroke="snow" tickLine={false} axisLine={false} padding={{right:30}} />
          <YAxis mirror={false} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false} />
          <Legend />
        </LineChart>

      </ResponsiveContainer>
    </QVReport>
  );
}

export default ThisWeekVsLast;

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../../../site.module.css';
import Loader from '../../../../../../Components/Loader/Loader';
import Mutate from '../../../../../../Utils/Mutate';
import useChartComponent from '../../../../../../hooks/useChartComponent';


const ThisWeekVsLast = ({ title }) => {
  const {status,parseChartData} = useChartComponent("CurrentVsLastWeek",Mutate.thisWeekVsLastWeekData);

  return (
    <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>

      {status.isLoading && <Loader text="Loading Report..."></Loader>}
      
       <h2>{title}</h2>


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
    </div>
  );
}

export default ThisWeekVsLast;
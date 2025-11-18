
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../../../site.module.css';

const ThisWeekVsLast = ({ title }) => {
  const data = [
      {name: 'Mon', thisWeekSales: 2400,lastWeekSales: 2634},
      {name: 'Tue', thisWeekSales: 3240,lastWeekSales: 2520},
      {name: 'Wed', thisWeekSales: 2769,lastWeekSales: 1999},
      {name: 'Thu', thisWeekSales: 3145,lastWeekSales: 5321},
      {name: 'Fri', thisWeekSales: 3801,lastWeekSales: 1256},
      {name: 'Sat', thisWeekSales: 4019,lastWeekSales: 4798},
      {name: 'Sun', thisWeekSales: 1800,lastWeekSales: 2275},
    ];
  return (
    <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>
      
       <h2>{title}</h2>

       <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data} margin={{top:0,right:0,left:-25,bottom:0}}>
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

import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../site.module.css';
import useChartComponent from '../../../../hooks/useChartComponent';
import Mutate from '../../../../Utils/Mutate';
import Loader from '../../../Loader/Loader';

// const data = [
//       {name: 'Mon', totalSales: 67.43,totalItems: 8},
//       {name: 'Tue', totalSales: 49.76,totalItems: 6},
//       {name: 'Wed', totalSales: 51.32,totalItems: 6},
//       {name: 'Thu', totalSales: 37.34,totalItems: 5},
//       {name: 'Fri', totalSales: 63.62,totalItems: 13},
//       {name: 'Sat', totalSales: 71.45,totalItems: 15},
//       {name: 'Sun', totalSales: 61.29,totalItems: 10},
//     ];

const AverageBasketDetails = ({ title }) => {
  const {status,parseChartData} = useChartComponent("AvgBasketDetails",Mutate.basketDetailsData);
  return (
    <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>
      {status.isLoading && <Loader text="Loading Report..."></Loader>}
       <h2>{title}</h2>

       <ResponsiveContainer width="100%" height="100%">

        <AreaChart data={parseChartData()} margin={{top:0,right:0,left:-35,bottom:0}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff0fef61" stopOpacity={1}/>
              <stop offset="95%" stopColor="#ff0fef61" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d51" stopOpacity={1}/>
              <stop offset="95%" stopColor="#82ca9d61" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="snow" tickLine={false} axisLine={false} padding={{right:30}}  />
          <YAxis mirror={false} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false} />                            
          <Area type="monotone" dataKey="totalSales" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          <Area type="monotone" dataKey="totalItems" stroke="#ff0fef" fillOpacity={1} fill="url(#colorUv)" />
          <Legend />
          <Tooltip />
        </AreaChart>

      </ResponsiveContainer>
    </div>
  );
}

export default AverageBasketDetails;
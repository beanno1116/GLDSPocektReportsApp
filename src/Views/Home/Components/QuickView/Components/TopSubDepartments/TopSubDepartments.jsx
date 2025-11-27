
import { Bar, BarChart, LabelList, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../../../site.module.css';
import { useContext } from 'react';
import { AppContext } from '../../../../../../Contexts/AppContext';
import { useFetchReportData } from '../../../../../../Api/ApiRoutes';

  const tdata = [
      {name: 'Produce', thisWeekSales: 657.54,lastWeekSales: 2634},
      {name: 'Frozen', thisWeekSales: 436.23,lastWeekSales: 2520},
      {name: 'Grocery', thisWeekSales: 843.54,lastWeekSales: 1999},
      {name: 'NT-Groc', thisWeekSales: 196.54,lastWeekSales: 5321},
      {name: 'Deli', thisWeekSales: 268.45,lastWeekSales: 1256},
    ];


const TopSubDepartments = ({ title }) => {
  const {state,dispatch} = useContext(AppContext);
  const {status,data} = useFetchReportData({action:"TopSubDepartments",agentString:state.agentString});
  



  if (status.isLoading){
    return (
      <div>
        <h1>Loading report...</h1>
      </div>
    )
  }

  return (
    <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>
      
       <h2>{title}</h2>

       <ResponsiveContainer width="100%" height="100%">

        <BarChart data={tdata} margin={{top:0,right:0,left:0,bottom:0}}>
          <Bar type="monotone" dataKey="thisWeekSales" stroke="#ff0fef61" fill='#ff0fef61' strokeWidth={4}>
            <LabelList dataKey="name" position="insideEnd" angle="-90" fill='snow' />
            <LabelList dataKey="thisWeekSales" position="top" fill='snow' />
          </Bar>
          {/* <XAxis dataKey="name" angle={-90} stroke="snow" tickLine={false} axisLine={false} margin={{left:10}}/> */}
          <YAxis mirror={true} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false}/>
        </BarChart>

      </ResponsiveContainer>
    </div>
  );
}

export default TopSubDepartments;

import { Bar, BarChart, LabelList, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useAppContext from '../../../../hooks/useAppContext';
import Mutate from '../../../../Utils/Mutate';
import { useFetchReportData } from '../../../../Api/ApiRoutes';
import QVReport from '../Template/QVReport';

  const tdata = [
      {name: 'Produce', thisWeekSales: 657.54,lastWeekSales: 2634},
      {name: 'Frozen', thisWeekSales: 436.23,lastWeekSales: 2520},
      {name: 'Grocery', thisWeekSales: 843.54,lastWeekSales: 1999},
      {name: 'NT-Groc', thisWeekSales: 196.54,lastWeekSales: 5321},
      {name: 'Deli', thisWeekSales: 268.45,lastWeekSales: 1256},
    ];


const TopSubDepartments = ({ title }) => {
  const {state} = useAppContext();
  const {status,data} = useFetchReportData({action:"TopSubDepartments",agentString:state.agentString});
  


  return (
    <QVReport status={status}>
      <QVReport.Title text={title} />
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
    </QVReport>
  );
}

export default TopSubDepartments;
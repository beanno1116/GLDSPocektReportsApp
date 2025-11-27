
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../../../site.module.css';
import { useFetchReportData } from '../../../../../../Api/ApiRoutes';
import { useContext } from 'react';
import { AppContext } from '../../../../../../Contexts/AppContext';



const parseReportData = (data) => {
    try {
      if (!data) return [];
      const tempObj = new Map();
      data.forEach(record => {
        if (record.WeekType.toLowerCase() === "current"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),thisWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,thisWeekSales:record.SalesAmount});            
          }          
        }
        if (record.WeekType.toLowerCase() === "prior"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),lastWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,lastWeekSales:record.SalesAmount});            
          }         
        }
      });
      
      let dataArray = [];
      for (const [key,value] of tempObj){
        dataArray.push(value);
      }
      return dataArray;
    } catch (error) {
      console.error(error.message);
    }
  }

const ThisWeekVsLast = ({ title }) => {
  const {state,dispatch} = useContext(AppContext);
  const {status,data} = useFetchReportData({action:"CurrentVsLastWeek",agentString:state.agentString});
  

  

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

        <LineChart data={parseReportData(data)} margin={{top:0,right:0,left:-25,bottom:0}}>
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
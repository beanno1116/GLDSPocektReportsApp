
import { Bar, BarChart, LabelList,ResponsiveContainer, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../../../site.module.css';

const FraudDetails = ({ title }) => {
  const data = [
      {name: 'Cancel Prev', total: 2},
      {name: 'Cancel Order', total: 5},
      {name: 'Corr- ections', total: 2},
      {name: 'No Sale', total: 1},
      {name: 'Refunds', total: 3},
    ];
  return (
    <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>
      
       <h2>{title}</h2>

       <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data} margin={{top:0,right:0,left:0,bottom:0}}>
          <Bar type="monotone" dataKey="total" stroke="#ff0fef61" fill='#ff0fef61' strokeWidth={4}>
            <LabelList dataKey="name" position="top" fill='snow' offset={15}/>
            <LabelList dataKey="total" position="insideBottom" fill='snow' offset={15} />
          </Bar>
          
        </BarChart>

      </ResponsiveContainer>
    </div>
  );
}

export default FraudDetails;

import { Bar, BarChart, LabelList,ResponsiveContainer, XAxis, YAxis } from 'recharts';
import styles from '../../quickView.module.css';
import siteStyles from '../../../../site.module.css';
import { useQueries } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import Mutate from '../../../../Utils/Mutate';
import useAppContext from '../../../../hooks/useAppContext';
import { useApiClient } from '../../../../Api/Api';

const testQueries = [
  "CancelPrev",
  "CancelOrder",
  "NoSale",
  "Refund"
]

const data = [
      {name: 'Cancel Prev', total: 2},
      {name: 'Cancel Order', total: 5},
      {name: 'Corr- ections', total: 2},
      {name: 'No Sale', total: 1},
      {name: 'Refunds', total: 3},
    ];

const FraudDetails = ({ title }) => {

  const {state} = useAppContext();
  
  const api = useApiClient();
  const results = useQueries({
    queries: testQueries.map(query => ({
      queryKey: [query,title],
      queryFn: async () => {         
        const response = await api.post("data",{action:query,agentString:state.agentString},{...api.headers.applicationJson}); 
        if (response.success){
          return response.data;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    }))
  })


  const viewData = results.map(r => r.data);
  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);
 

  if (isLoading){
    return (
      <Loader text="Loading Report..."></Loader>
    )
  }

  if (isError){    
    return (
      <div>Error occurred!</div>
    )
  }

  
    // ;
    return (
      <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}>
        {isLoading && <Loader text="Loading Report..."></Loader>}
        <h2>{title}</h2>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={Mutate.fraudWatchData(viewData)} margin={{top:0,right:0,left:0,bottom:0}}>
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
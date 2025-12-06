
import styles from '../storeSelectorView.module.css';
import siteStyles from '../../../site.module.css';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useFetchAllReportData, useGetStoreConnectionStatus } from '../../../Api/ApiRoutes';
import { uuid } from '../../../Utils/Utils';
import { useApiClient } from '../../../Api/Api';
import Format from '../../../Utils/Format';
import Heading from '../../../Components/Labels/Heading';

// const testQueries = [
//   {
//     action: "HourlySales",
//     id: uuid(),
//     agentString: "812e3930-4845-4273-9013-a84f26e9882b",
//     query: (api,params) => {
//       const controller = new AbortController();
//       const signal = controller.signal;
//       return async () => {
//         const response = await api.post("data",params,{...api.headers.applicationJson,signal});  
//         if (response.success){
//           return response.data;
//         }  
//         throw new Error("Newtwork response was unsuccessfull");
//       }        
//     }
//   },
//   {
//     action: "NetSales",
//     id: uuid(),
//     agentString: "812e3930-4845-4273-9013-a84f26e9882b",
//     query: (api,params) => {
//       const controller = new AbortController();
//       const signal = controller.signal;
//       return async () => {
//         const response = await api.post("data",params,{...api.headers.applicationJson,signal});          
//         if (response.success){
//           return response.data;
//         }  
//         throw new Error("Newtwork response was unsuccessfull");
//       }        
//     }
//   }
// ]

const testQueries = [
  "HourlySales",
  "NetSales",  
]

const createQuery = (name,agentString,method) => {


  return {
    queryKey: [name,agentString],
    queryFn: new Promise()
  }
}

const buttonQueries = [
  {
    queryKey: ["hour"]
  }
]

const StoreButtonNav = ({ store,onClick }) => {
  // const {status,data} = useGetStoreConnectionStatus(store.agentString);
  const api = useApiClient();
  const results = useQueries({
    queries: testQueries.map(query => ({
      queryKey: [query,store.agentString],
      queryFn: async () => {
        // Simulate an API call with a parameter (id)        
        const response = await api.post("data",{action:query,agentString:store.agentString},{...api.headers.applicationJson}); 
        if (response.success){
          return response.data;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }
      // queryFn: query.query(api,{action:query.action,agentString:store.agentString})
    }))
  })


  const viewData = results.map(r => r.data);
  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);
 

 if (isLoading){
  return (
    <div>Loading</div>
  )
 }

 if (isError){
  ;
  return (
    <div>Error occurred!</div>
  )
 }

 if (!isLoading){

  const getButtonData = () => {
    const retData = {...viewData[0][0],...viewData[1][0]};    
    return retData;    
  }
  const buttonData = getButtonData();
   ;

   if (true){
  //  if (buttonData?.ValidTransactionCount && buttonData.ValidTransactionCount !== "0"){
    return (
      <button data-value={store.id} className={`${styles.store_button} ${siteStyles.panel_bg}`} onClick={onClick}>
        <h1>{store.name}</h1>
        <div className={styles.store_button_stat_row}>
          <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"1"}}>
            <label className={styles.stat_widget_label}>Sales</label>
            <div className={styles.stat_widget_big_dollar}>{Format.totalSalesShort(buttonData.NetProductSales)}</div>
          </div>
          <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"2"}}>
            <label className={styles.stat_widget_label}>Transactions</label>
            <div className={styles.stat_widget_big_dollar}>{buttonData?.ValidTransactionCount ? buttonData.ValidTransactionCount : ""}</div>
          </div>
          <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"1"}}>
            <label className={styles.stat_widget_label}>Hourly</label>
            <div className={styles.stat_widget_big_dollar}>{Format.totalSalesShort(buttonData.AvgSalesPerHour)}</div>
          </div>
        </div>
        <div className={styles.store_widget_location_row}>{store.city}, {store.state}</div>
      </button>
    );
   }
    return (
      <button disabled={true} data-value={store.id} className={`${styles.store_button} ${siteStyles.panel_bg}  ${styles.issue}`} onClick={onClick}>
        <h1 style={{opacity:".5"}}>{store.name}</h1>
        <div className={styles.store_button_stat_row}>
          <div  style={{flex:"1",opacity:".5"}} className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`}>
            <h1>Store disconnected!</h1>
          </div>
        </div>
        <div style={{opacity:".5"}} className={styles.store_widget_location_row}>{store.city}, {store.state}</div>
      </button>
    );
 }
}

export default StoreButtonNav;
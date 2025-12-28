
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useAppContext from '../../hooks/useAppContext';
import styles from './cards.module.css';
import { useApiClient } from '../../Api/Api';
import Placeholder from '../Loader/Placeholder';
import Loader from '../Loader/Loader';


const AsyncCard = ({ requests }) => {
  const api = useApiClient();
  const {state} = useAppContext();
  const results = useQueries({
    queries: requests.map(query => ({
      queryKey: [query,state.agentString],
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


  return (
    <div>
       
    </div>
  );
}

export default AsyncCard;
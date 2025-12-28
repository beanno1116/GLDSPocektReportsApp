

import { useQueries } from '@tanstack/react-query';
import { useApiClient } from '../../Api/Api';
import useAppContext from '../../hooks/useAppContext';
import Card from './Card';
import DetailRow from './Components/DetailRow';
import Loader from '../Loader/Loader';

const schema = [
  {
    title: "Cash",
    subTitle: "$1,256,491.00",
    details: [
      {
        title: "Loan",
        value: "$25.45"
      }
    ]
  },
  {
    title: "Check",
    subTitle: "$983.00",
    details: [
      {
        title: "Pick Up",
        value: "$234.32"
      }
    ]
  }
]

const DetailsCard = ({ title,requests }) => {
  const api = useApiClient();
  const {state} = useAppContext();
  const results = useQueries({
    queries: requests.map(query => ({
      queryKey: [query.action,state.agentString],
      queryFn: async () => {         
        const response = await api.post("data",{action:query.action,agentString:state.agentString},{...api.headers.applicationJson}); 
        if (response.success){
          
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
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

  
  if (viewData){
    
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Content>
          <div style={{position:"relative",width:"100%",height:"100%"}}>
            <div style={{position:"absolute",display:"flex",flexDirection:"column",borderRadius:".5rem",gap:"1rem",width:"100%",height:"100%",overflowY:"scroll"}}>
              {viewData[0].map(row => {
                return (
                  <DetailRow title={row.title} subtitle={row.subTitle} details={row.details}></DetailRow>
                )
              })}
              
            </div>

          </div>
  
          
          {/* <DetailRow title={"Cash"} subtitle={"$1,256,4915.00"}></DetailRow> */}
  
  
        </Card.Content>
      </Card>
    );
    
  }
  if (isError){    
    return (
      <div>Error occurred!</div>
    )
  }
}

export default DetailsCard;
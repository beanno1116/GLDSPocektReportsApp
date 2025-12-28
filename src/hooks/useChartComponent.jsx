import useAppContext from "./useAppContext";
import { useFetchReportData } from "../Api/ApiRoutes";


const useChartComponent = (chart,mutationFn) => {
    const {state} = useAppContext();
    const {status,data,refetch} = useFetchReportData({action:chart,agentString:"dfdd44e8-be22-43ef-8313-95f2d1904566"});
    // const {status,data,refetch} = useFetchReportData({action:chart,agentString:state.agentString});

    const parseChartData = () => {
      try {
        if (status.isLoading) return [];
        
        if (mutationFn){
          return mutationFn(data);
        }
        return data;
      } catch (error) {
        console.error(error.message);
      }
    }

    return {
      state,
      status,
      data,
      refetch,
      parseChartData
    }
}

export default useChartComponent;

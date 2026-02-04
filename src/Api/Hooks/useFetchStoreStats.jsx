import { useQueries } from "@tanstack/react-query";
import LocDataAdapter from "../../Models/LocReportAdapter";

const viewQueries = [
  {
    action: "Stats",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    key: "past",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
]


const useFetchStoreStats = () => {

  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: getPeriodDateRange(query.key)
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson});
        // const response = await api.post("data",{action:query.action,agentString:"dfdd44e8-be22-43ef-8313-95f2d1904566"},{...api.headers.applicationJson}); 
        if (response.success){
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    })),
    combine: (results) => {      
      return {
        viewData: results.map(r => r.data),
        isLoading: results.some(r => r.isLoading),
        isPending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some(r => r.isError),
        refetchAll: () => {
          viewQueries.forEach(query => {
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })
}
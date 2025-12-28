import { useQueries, useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "./Api";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../Contexts/AppContext";
import User from "../Models/User";
import { uuid } from "../Utils/Utils";


const getOrgData = async ({api,signal,token,userId}) => {  
  const response = await api.get("organizations",{params:{token,userId},signal});    
  let orgData = {};
  if (response.success){    
    const {id,stores} = response.data;
    orgData = {
      organization: id,
      stores: stores,
      users: [],
      activeStore: 0,
      didInit: true,
      agentString: ""
    }
    localStorage.setItem("appContext",JSON.stringify(orgData));
  }
  return orgData;
}
const useGetOrgData = (disabled=false) => {
  const auth = useAuth();
  const api = useApiClient();  
  const authUser = auth.getAuthUser();  
  const {dispatch} = useContext(AppContext);
  const { isLoading, isError,isSuccess,isIdle, data,error,refetch } = useQuery({
      queryKey: ["organization"],
      queryFn: ({signal}) => getOrgData({api,signal,token:auth.token,userId:authUser.id,dispatch}),
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      keepPreviousData: true,
      disabled
    })
  
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      org: data,
      error,
      refetch
    };
}

const getStoresForOrg = async ({api,signal,token,orgId}) => {  
  const response = await api.get("stores",{params:{token,orgId},signal});  
  return response;
}
const useGetStoresForOrg = () => {  
  const auth = useAuth();
  const api = useApiClient();  
  const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["stores",auth.user.orgId],
      queryFn: ({signal}) => getStoresForOrg({api,signal,token:auth.token,orgId:auth.user.orgId}),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    })
  
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      stores:data,
      error
    };
}

const getOrgUsers = async ({api,signal,token,orgId}) => {
  const response = await api.get("/users",{params:{token,orgId},signal});   
  if (response.success){    
    return response.data.map(rd => new User(rd));
  } 
  return [];
}
const useGetOrgUsers = (orgId) => {
  const auth = useAuth();
  const api = useApiClient();
  
  const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["organizations/users",orgId],
      queryFn: ({signal}) => getOrgUsers({api,signal,token:auth.token,orgId:orgId}),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    })
  
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      users:data,
      error
    };
}

const getStoreConnectionStatus = async ({api,agentString,signal}) => {
  const response = await api.get("ping",{params:{agentString},signal})
  ;
  if (response.success){    
    return response.data.map(rd => new User(rd));
  } 
  return [];
}
const useGetStoreConnectionStatus = (agentString) => {
  const api = useApiClient();  
  const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["ping",agentString],
      queryFn: ({signal}) => getStoreConnectionStatus({api,signal,agentString}),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    })
  
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      users:data,
      error
    };
}



const getReportData = async (api,params,signal,mutate) => {  
  const response = await api.post("data",params,{...api.headers.applicationJson,signal}); 

  if (response.success){
    if (mutate){
      
      return mutate(response.data);
    }
    return response.data;
  }  
  return [];
}

const testQueries = [
  {
    action: "HourlySales",
    id: uuid(),
    agentString: "812e3930-4845-4273-9013-a84f26e9882b",
    query: (api,params) => {
      const controller = new AbortController();
      const signal = controller.signal();
      return async () => {
        const response = await api.post("data",params,{...api.headers.applicationJson,signal});  
        if (response.success){
          return response.data;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }        
    }
  },
  {
    action: "NetSales",
    id: uuid(),
    agentString: "812e3930-4845-4273-9013-a84f26e9882b",
    query: (api,params) => {
      const controller = new AbortController();
      const signal = controller.signal();
      return async () => {
        const response = await api.post("data",params,{...api.headers.applicationJson,signal});  
        if (response.success){
          return response.data;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }        
    }
  }
]

export const useFetchAllReportData = ({queries=testQueries}) => {
  // ;
  const [reportData,setReportData] = useState({});
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  const api = useApiClient();
  const results = useQueries({
    queries: queries.map(query => ({
      queryKey: ['report',query.id],
      queryFn: query.query(api,{action:query.action,agentString:query.agentString})
    }))
  })

  // if (results.some(result => result.isLoading)){
  //   setIsLoading(true);
  // }

  if (!results.some(result => result.isLoading)){    
    let reportObj = {}
    results.forEach(result => {      
      let resultObj = result.data[0];
      reportObj = {...reportObj,...resultObj};      
    })
    setReportData({...reportObj})    
  }

  // if (results.some(result => result.isError)){
  //   setIsError(true);
  // }


  return {
    isError,
    isLoading,
    reportData
  }
}

const useFetchReportData = ({action,agentString="",enabled=true,mutate}) => {  
  const auth = useAuth();
  const api = useApiClient();
  
  
  const params = {
    action,
    token: auth.token,
    agentString: agentString === "" ? api.agentString : agentString,
    posFields: {startDate:"",endDate:""}
  }


  const { isLoading, isError,isSuccess,isIdle, data,error,refetch } = useQuery({
      queryKey: [action,agentString],
      queryFn: ({signal}) => getReportData(api,params,signal,mutate),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true,      
    })
  
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      data,
      refetch,
      error
    };
}

const fetch = () => {
  return (action,agentString="") => {    
    const auth = useAuth();
    const api = useApiClient();
    const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["users",auth.user.orgId],
      queryFn: ({signal}) => api.dataFetch(signal,auth.token,action,agentString),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    })
    const status = {
      isLoading,
      isError,
      isSuccess,
      isIdle
    }
  
    return {
      status,
      users:data,
      error
    };
  }
}
// add user 
// userId,nonAdminUserId,storeId grant user access
// userId,nonAdminUserId

export {
  fetch,
  useFetchReportData,
  useGetOrgData,
  useGetStoreConnectionStatus,
  useGetStoresForOrg,
  useGetOrgUsers
}
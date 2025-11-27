import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "./Api";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";


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
  const response = await api.get("organizations/users",{params:{token,orgId},signal}); 
  return response.data;
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

const getReportData = async (api,params,signal) => {
  const response = await api.post("data",params,{...api.headers.applicationJson,signal});
  debugger;
  if (response.success){
    return response.data;
  }  
  return [];
}

const useFetchReportData = ({action,agentString="",enabled=true}) => {  
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
      queryFn: ({signal}) => getReportData(api,params,signal),
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
  useGetStoresForOrg,
  useGetOrgUsers
}
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "./Api";
import axios from "axios";


const getOrgData = async ({api,signal,token,orgId}) => {
  debugger;
  const response = await api.get("organizations",{params:{token,orgId},signal});
  debugger;
  return response;
}
const useGetOrgData = () => {
  const auth = useAuth();
  const api = useApiClient();  
  const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["stores",auth.user.orgId],
      queryFn: ({signal}) => getOrgData({api,signal,token:auth.token,orgId:auth.user.orgId}),
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

const getStoresForOrg = async ({api,signal,token,orgId}) => {  
  debugger;
  const response = await api.get("stores",{params:{token,orgId},signal});  
  debugger;
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
  const response = await api.get("users",{params:{token,orgId},signal});  
  return response.data;
}
const useGetOrgUsers = () => {
  const auth = useAuth();
  const api = useApiClient();
  
  const { isLoading, isError,isSuccess,isIdle, data,error } = useQuery({
      queryKey: ["users",auth.user.orgId],
      queryFn: ({signal}) => getOrgUsers({api,signal,token:auth.token,orgId:auth.user.orgId}),
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
  useGetOrgData,
  useGetStoresForOrg,
  useGetOrgUsers
}
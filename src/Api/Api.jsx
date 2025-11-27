import axios from "axios";
import { createContext, useContext } from "react";


const API_ENDPOINT_BASE = "https://prapi.gldstools.com/";
const DEV_API_ENDPOINT_BASE = "http://localhost:5196/";

const DATA_API_ENDPOINT = "data";

export function getApiEndpoint(debug){
  return debug ? DEV_API_ENDPOINT_BASE : API_ENDPOINT_BASE
}


const headers = {
  multiPartFormData: {
    "Accept": "multipart/form-data",
    "Content-Type": "multipart/form-data"
  },
  applicationJson: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}

const context = createContext();

export function ApiClientProvider({children,client}){
  return <context.Provider value={client}>{children}  </context.Provider>
}

export function useApiClient(){
  const client = useContext(context);

  return client;
}


export class ApiClient {
  client;
  endPointBase;
  headers;
  agentString;

  constructor(apiEndPointBase){
    this.headers = headers,
    this.endPointBase = apiEndPointBase;
    this.client = axios.create({
      baseURL: this.endPointBase,
      headers:{ 'Authorization': 'Bearer abcde12345'}
    })
  }

  updateAgentString(agentString){
    this.agentString = agentString;
  }

  async dataFetch(signal,token,action,agentString=""){
    return new Promise((resolve,reject) => {
      try {
        agentString = agentString === "" ? this.agentString : agentString;
        this.client.get(DATA_API_ENDPOINT,{params:{token,agentString,action}},signal).then((data) => {
          debugger;
          if (data.status !== 200 && data.statusText !== "OK") throw new Error("Error with request");
          resolve(data.data);
        })
      } catch (error) {
        reject(error.message);
      }
    })
  }

  async post(endPoint,data,headers){
    // debugger;
    return new Promise((resolve,reject) => {
      try {
        this.client.post(endPoint,data,{headers}).then((data) => {
          debugger;
          if (data.status !== 200 && data.statusText !== "OK") throw new Error("Error with request");
          resolve(data.data) 
        })        
      } catch (error) {
        reject(error.message)
      }
    })
  }

  async get(endPoint,config){
    return new Promise((resolve,reject) => {
      try {
        this.client.get(endPoint,config).then((data) => {
          if (data.status !== 200 && data.statusText !== "OK") throw new Error("Error with request");
          resolve(data.data);
        })
      } catch (error) {
        reject(error.message);
      }
    })
  }

}


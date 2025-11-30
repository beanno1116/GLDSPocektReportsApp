import { createContext, useReducer, useState } from "react";
import { appContextReducer } from "./AppContextReducer";

export const AppContext = createContext();

let initialState = {};
let localData = localStorage.getItem("org");
if (localData){
  localData = JSON.parse(localData);
  initialState = {
    seats: localData.seats,
    organization: localData.organization,
    stores: localData.stores,
    users: localData.users,
    activeStore: localData.activeStore,
    agentString: localData.agentString,
    didInit: true
  }
}else{
  initialState = {
    organization: "",
    stores: [],
    users: [],
    seats: 0,
    activeStore: 0,
    agentString: "",
    didInit: false
  }
}



export const AppContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(appContextReducer,initialState);

  return (
    <AppContext.Provider value={{state,dispatch}}>
      {children}
    </AppContext.Provider>
  )

}
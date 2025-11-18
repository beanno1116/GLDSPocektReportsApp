import { createContext, useReducer, useState } from "react";
import { appContextReducer } from "./AppContextReducer";

export const AppContext = createContext();

const initialState = {
  organization: "",
  stores: []
}

export const AppContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(appContextReducer,initialState);

  return (
    <AppContext.Provider value={{state,dispatch}}>
      {children}
    </AppContext.Provider>
  )

}
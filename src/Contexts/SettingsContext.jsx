import { createContext, useReducer, useState } from "react";

export const SettingsContext = createContext();

let initialState = {};
let localData = localStorage.getItem("ac");

if (localData){
  localData = JSON.parse(localData);
  initialState = {
    seats: localData.seats,
    organization: localData.organization,
    stores: localData.stores,
    authorizedStores: localData.authorizedStores,
    users: localData.users,
    activeStore: localData.activeStore,
    agentString: localData.agentString,
    didInit: true
  }
}else{
  initialState = {
    viewSettings: {
      storeReport: {
        widgets: [],
        widgetOrder: [],
        alets: [],
        faqs: []
      }
    }
  }
}
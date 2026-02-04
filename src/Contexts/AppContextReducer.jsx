import { UPDATE_ACTIVE_STORE, UPDATE_AGENT_STRING, UPDATE_ORG_ID, UPDATE_SEATS, UPDATE_STORES, UPDATE_USERS } from "./actions"

const syncLocalStorage = {
  getLocalStorageData() {
    try {
      const appData = JSON.parse(localStorage.getItem("org"));
      return appData;
    } catch (error) {
      
    }
  },
  update(key,value){
    try {      
      let appData = this.getLocalStorageData();
      let updatedAppData = {...appData,[key]:value};
      localStorage.setItem("org",JSON.stringify(updatedAppData));
      return updatedAppData;
    } catch (error) {
      
    }
  }
}


export const appContextReducer = (state,action) => {  
  switch (action.type) {
    case UPDATE_ORG_ID:
      return {...state,organization:action.payload}
    case UPDATE_STORES:
      return {...state,stores:action.payload}
    case UPDATE_USERS:
      return {...state,users:action.payload}
    case UPDATE_ACTIVE_STORE:
    
      syncLocalStorage.update("activeStore",action.payload);
      
      return {...state,activeStore:action.payload}
    case UPDATE_AGENT_STRING:
      return {...state,agentString:action.payload}
    case UPDATE_SEATS:
      return {...state,seats:action.payload}
    default:
      return {...action.payload}
  }
}
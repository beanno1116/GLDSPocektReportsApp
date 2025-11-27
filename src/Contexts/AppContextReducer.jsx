export const appContextReducer = (state,action) => {  
  switch (action.type) {
    case "org":
      return {...state,organization:action.payload}
    case "stores":
      return {...state,stores:action.payload}
    case "users":
      return {...state,users:action.payload}
    case "activeStore":
      return {...state,activeStore:action.payload}
    case "agentString":
      return {...state,agentString:action.payload}
    default:
      return {...action.payload}
  }
}
export const appContextReducer = (state,action) => {
  debugger;
  switch (action.type) {
    case "org":
      return {...state,organization:action.payload}
    case "stores":
      return {...state,stores:action.payload}
    default:
      return {...action.payload}
  }
}
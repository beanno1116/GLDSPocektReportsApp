import { useState } from "react"
import DateUtility from "../Utils/DateUtils"

const currentDateRange = {
  startDate: new Date(),
  endDate: new Date()
}
const baseDateRange = {
  startDate: DateUtility.subtractDays(new Date(),1),
  endDate: DateUtility.subtractDays(new Date(),1)
}

const globalDateStore = {
  setValue(value,key){
    const gdr = JSON.parse(localStorage.getItem("gdr"));
    if (gdr){
      if (Object.keys(gdr).includes(key)){
        gdr[key] = value;
        localStorage.setItem("gdr",JSON.stringify(gdr));
        return;
      }
    };
    localStorage.setItem("gdr",JSON.stringify(value));
  },
  getValue(key){
    const gdr = JSON.parse(localStorage.getItem("gdr"));
    if (!gdr) return {current:currentDateRange,base: baseDateRange};
    if (Object.keys(gdr).includes(key)){
       return gdr[key]
    }
    return gdr;
  }
}

const useGlobalDate = (initialRange={...globalDateStore.getValue()}) => {
  const [dateRanges,setDateRange] = useState(initialRange);

  const setDateRanges = (dateRange,type) => {
    globalDateStore.setValue(dateRange,type);
    setDateRange({...dateRanges,...dateRange});
  }

  const getDateRange = (type) => {
    const gdr = globalDateStore.getValue(type);
    return gdr;
  }

  return {
    base: dateRanges.base,
    current: dateRanges.current,
    dateRanges:dateRanges,
    getDateRange,
    setDateRanges,
  }
}

export default useGlobalDate
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

const initializeGlobalStore = (gdr) => {
  if (!gdr) return false;
  return {
    base: {
      startDate: DateUtility.createDate(gdr.base.startDate),
      endDate: DateUtility.createDate(gdr.base.endDate)
    },
    current: {
      startDate: DateUtility.createDate(gdr.current.startDate),
      endDate: DateUtility.createDate(gdr.current.endDate)
    }
  }
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
    const gdr = initializeGlobalStore(JSON.parse(localStorage.getItem("gdr")));
    
    if (!gdr) {
      this.setValue({current:currentDateRange,base: baseDateRange},"gdr");
      return {current:currentDateRange,base: baseDateRange};
    }
    if (Object.keys(gdr).includes(key)){
       return gdr[key]
    }
    return gdr;
  }
}

const useGlobalDate = (initialRange={...globalDateStore.getValue()}) => {
  const [dateRanges,setDateRange] = useState(initialRange);
  const [period,setPeriod] = useState("today");

  const setDateRanges = (dateRange,type) => {
    globalDateStore.setValue(dateRange,type);
    setDateRange({...dateRanges,...dateRange});
  }

  const getDateRange = (type) => {
    const gdr = globalDateStore.getValue(type);
    return gdr;
  }

  const changePeriod = (period) => {
    setPeriod(period);
  }

  return {
    base: dateRanges.base,
    changePeriod,
    current: dateRanges.current,
    dateRanges:getDateRange(),
    getDateRange,
    period,
    setDateRanges,
  }
}

export default useGlobalDate
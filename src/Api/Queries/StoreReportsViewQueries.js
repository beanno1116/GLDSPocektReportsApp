import LocDataAdapter from "../../Models/LocReportAdapter";
import Query from "../../Models/Query";
import DateUtility from "../../Utils/DateUtils";
import Format from "../../Utils/Format";

const queries = [
  {
    action: "Stats",
    type: "current",
    key: ["Stats_current"],
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    type: "base",
    key: ["Stats_base"],
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "CurrentVsLastWeek",
    type: "current",
    key: ["CurrentVsLastWeek"],
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseWeekData(data);
      return adaptedData;
    }
  },
  {
    action: "BalanceSheet7D",
    type: "current",
    key: `BalanceSheet7D_current`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.getStartOfWeek(new Date())),
      endDate: Format.toRequestDateFormat(DateUtility.getEndOfWeek(new Date()))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parse7DayBalanceSheet(data);
      return adaptedData;
    }
  },
]

export const viewQueries = (dateRanges,keyStrings=[]) => {
  try {
    // debugger
    const queryArray = [];
    for (let i = 0; i < queries.length; i++){
      const query = queries[i];
      let dateRange = dateRanges[query.type];
      let retDateRange = {
        startDate: Format.toRequestDateFormat(dateRange.startDate),
        endDate: Format.toRequestDateFormat(dateRange.endDate)
      }
      if (query.action === "BalanceSheet7D"){
        retDateRange = {
          startDate: Format.toRequestDateFormat(dateRange.startDate),
          endDate: Format.toRequestDateFormat(DateUtility.addDays(dateRange.startDate,6))
        }
        // 
      }
      const newQuery = new Query(query.action,query.type,query.adapter,retDateRange,keyStrings);    
      queryArray.push(newQuery);        
    }
    return queryArray;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
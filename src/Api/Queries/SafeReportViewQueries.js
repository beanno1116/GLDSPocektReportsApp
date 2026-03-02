import LocDataAdapter from "../../Models/LocReportAdapter";
import Query from "../../Models/Query";
import DateUtility from "../../Utils/DateUtils";
import Format from "../../Utils/Format";

const queries = [
  {
    action: "BalanceSheet",
    type: "current",
    key: `BalanceSheet_current`,
    posFields: {
      startDate: Format.toRequestDateFormat(new Date()),
      endDate: Format.toRequestDateFormat(new Date())
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
      return adaptedData;
    }
  },
  {
    action: "BalanceSheet",
    type: "base",
    key: `BalanceSheet_base`,
    posFields: {
      startDate: Format.toRequestDateFormat(new Date()),
      endDate: Format.toRequestDateFormat(new Date())
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
      return adaptedData;
    }
  },
]

export const viewQueries = (dateRanges,keyStrings=[]) => {
  try {
    const queryArray = [];
    for (let i = 0; i < queries.length; i++){
      const query = queries[i];
      let dateRange = dateRanges[query.type];
      let retDateRange = {
        startDate: Format.toRequestDateFormat(dateRange.startDate),
        endDate: Format.toRequestDateFormat(dateRange.endDate)
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

export default viewQueries;
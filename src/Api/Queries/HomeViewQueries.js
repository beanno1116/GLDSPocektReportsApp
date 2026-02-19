import LocDataAdapter from "../../Models/LocReportAdapter";
import Query from "../../Models/Query";
import DateUtility from "../../Utils/DateUtils";
import Format from "../../Utils/Format";
import Mutate from "../../Utils/Mutate";

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
    action: "DepartmentTotals",
    type: "current",
    key: ["DepartmantTotals_current"],
    adapter(data){
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data,"desc");
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    type: "base",
    key: ["DepartmentTotals_base"],
    adapter(data){
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data,"desc");
      return adaptedData;
    }
  }
]

const viewQueries = (keyStrings=[]) => {
  try {
    const queryArray = [];
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const dateRanges = DateUtility.calculateDateRange(new Date(),DateUtility.TODAY_PERIOD);
      const activeRange = dateRanges[query.type];  
      const dr = {
        startDate: Format.toRequestDateFormat(activeRange.startDate),
        endDate: Format.toRequestDateFormat(activeRange.endDate)
      }    
      const newQuery = new Query(query.action,query.type,query.adapter,dr,keyStrings);
      queryArray.push(newQuery);    
    }
    // 
    return queryArray;
  } catch (error) {
    console.error(error.message);
  }
}

export default viewQueries;
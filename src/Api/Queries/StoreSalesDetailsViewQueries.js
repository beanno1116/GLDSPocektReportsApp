import LocDataAdapter from "../../Models/LocReportAdapter";
import Query from "../../Models/Query";
import DateUtility from "../../Utils/DateUtils";
import Format from "../../Utils/Format";

const queries = [
  {
    action: "HourlySales",
    type: "current",
    key: ["HourlySales_current"],
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseHourlySales(data);
      return adaptedData;
    }
  },
  {
    action: "HourlySales",
    type: "base",
    key: [`HourlySales_base`],
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setYearBack(new Date(),2)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseHourlySales(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    type: "current",
    key: [`DepartmentTotals_current`],
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data);
      return adaptedData;
    }
  },
  {
    action: "DepartmentTotals",
    type: "base",
    key: [`DepartmentTotals_base`],
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),2))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseDepartmentTotals(data);
      return adaptedData;
    }
  },
  {
    action: "BalanceSheet",
    type: "current",
    key: `BalanceSheet_current`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
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
          startDate: Format.toRequestDateFormat(DateUtility.getStartOfWeek(dateRange.startDate)),
          endDate: Format.toRequestDateFormat(DateUtility.getEndOfWeek(dateRange.startDate))
        }
      }
      if (query.action === "HourlySales" && query.type === "base"){
        retDateRange = {
          startDate: Format.toRequestDateFormat(DateUtility.setYearBack(DateUtility.getFirstOfYear(dateRange.startDate),2)),
          endDate: Format.toRequestDateFormat(dateRange.endDate)
        }
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
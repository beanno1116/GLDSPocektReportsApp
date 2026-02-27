import LocDataAdapter from "../../Models/LocReportAdapter";
import Query from "../../Models/Query";
import DateUtility from "../../Utils/DateUtils";
import Format from "../../Utils/Format";

const reportQueries = {
  tender: {
    action: "BalanceSheet",
    type: "tender",
    key: `BalanceSheet`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {   
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
  
      if (adaptedData?.tendered && adaptedData.tendered.length > 0){
        return {
          category: 'Tender Metrics',
          metrics: adaptedData.tendered.map(tender => {
            return {
              id: tender.lookup,
              label: tender.description,
              icon: '💵'
            }
          }),
          tenders: adaptedData.tendered
        }
        return adaptedData.tendered;
      }
      return [];
    }
  },
  sales: {
    action: "BalanceSheet",
    type: "sales",
    key: `BalanceSheet`,
    posFields: {
      startDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1)),
      endDate: Format.toRequestDateFormat(DateUtility.setDateBack(new Date(),1))
    },
    adapter(data) {   
      const adaptedData = LocDataAdapter.parseBalanceSheet(data);
  
      if (adaptedData?.sales && adaptedData.sales.length > 0){
        return {
          category: 'Sales Metrics',
          metrics: adaptedData.sales.map(sale => {
            return {
              id: sale.lookup,
              label: sale.description,
              icon: '💰'
            }
          }),
          sales: adaptedData.sales
        }
        return adaptedData.tendered;
      }
      return [];
    }
  },
}

export const getReportQueries = (reportType,reportConfig,keyStrings=[]) => {
  try {
    
    const {startDate,endDate,compareStartDate,compareEndDate} = reportConfig
    const query = reportQueries[reportType];
    const queryArray = [];

    if (!compareStartDate || !compareEndDate) {
      let retDateRange = {
        startDate: startDate,
        endDate: endDate
      }
      const newQuery = new Query(query.action,query.type,query.adapter,retDateRange,keyStrings);
      queryArray.push(newQuery);
      return queryArray;
    }

    let retDateRange = {
      startDate: startDate,
      endDate: endDate
    }

    let baseDateRange = {
      startDate: compareStartDate,
      endDate: compareEndDate
    }
    const newQuery = new Query(query.action,query.type,query.adapter,retDateRange,keyStrings);
    const newBaseQuery = new Query(query.action,query.type,query.adapter,baseDateRange,keyStrings);
    queryArray.push(...[newQuery,newBaseQuery]);
    ;
    return queryArray;
  } catch (error) {
    console.error(error.message);
    return [];
  }

}
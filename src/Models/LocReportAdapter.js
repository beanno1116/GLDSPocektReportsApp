import { removeAllSpaces } from "../Utils/Utils";
import StatRecord from "./StatRecord";
import Format from "../Utils/Format";
import Sort from "../Utils/Sort";


const salesMapping = {
  "totalsales": {
    key: "totalSales",
    name: "Total Sales",
    group: "sales"
  },
  "hashsales": {
    key: "hashSales",
    name: "Hash Sales",
    group: "sales"
  },
  "netsales": {
    key: "netSales",
    name: "Net Sales",
    group: "sales"
  },
  "grand-ttlnet": {
    key: "grandTotal",
    name: "Grand Total",
    group: "sales"
  },
  "costofgoods": {
    key: "costOfGoodsSold",
    name: "COG Sold",
    group: "sales"
  },
  "discountablesales": {
    key: "discountableSales",
    name: "Discountable Sales",
    group: "sales"
  },
  "foodstampable": {
    key: "foodstampable",
    name: "Foodstampable",
    group: "sales"
  },
  "wicable": {
    key: "wicable",
    name: "Wicable",
    group: "sales"
  },
  "couponable": {
    key: "couponable",
    name: "Couponable",
    group: "sales"
  },
  "salesnontaxable": {
    key: "salesNonTaxable",
    name: "Sales Non Taxable",
    group: "sales"
  },
  "bottlesales": {
    key: "bottleSales",
    name: "Bottole Sales",
    group: "sales"
  }
}
const loyaltyMapping = {
  "pointsgiven": {
    key: "pointsGiven",
    name: "Points Given",
    group: "loyalty"
  },
  "pointsredeemed": {
    key: "pointsRedeemed",
    name: "Points Redeemed",
    group: "loyalty"
  },
  "itemswithid": {
    key: "items",
    name: "Items",
    group: "loyalty"
  },
  "customerswithid": {
    key: "customers",
    name: "Customers",
    group: "loyalty"
  }
}
const couponMapping = {
  "storecoupon": {
    key: "storeCoupon",
    name: "Store Coupon",
    group: "coupon"
  },
  "vendorcoupon": {
    key: "vendorCoupon",
    name: "Vendor Coupon",
    group: "coupon"
  },
  "elect.vendorcoupon": {
    key: "eVendorCoupon",
    name: "Elec. Vendor Coupon",
    group: "coupon"
  },
  "elect.storecoupon": {
    key: "eStoreCoupon",
    name: "Elec. Store Coupon",
    group: "coupon"
  }
}
const taxMapping = {
  "tax": {
    key: "tax",
    name: "Tax",
    group: "tax"
  },
  "taxable": {
    key: "taxable",
    name: "Taxable",
    group: "tax"
  },
  "taxexempt": {
    key: "taxExempt1",
    name: "Tax Exempt 1",
    group: "tax"
  },
}
const exceptionMapping = {
  "cancelprev.item": {
    key: "cancelPrevItem",
    name: "Cancel Prev Item",
    group: "exception"
  },
  "cancelorder": {
    key: "cancelOrder",
    name: "Cancel Order",
    group: "exception"
  },
  "refundkeyinfo": {
    key: "refunds",
    name: "Refunds",
    group: "exception"
  },
  "nosales": {
    key: "noSales",
    name: "No Sales",
    group: "exception"
  }
}
const transactionMapping = {
  "itemsscanned": {
    key: "itemsScanned",
    name: "Items Scanned",
    group: "transaction"
  },
  "items": {
    key: "items",
    name: "items",
    group: "transaction"
  },
  "customers": {
    key: "customers",
    name: "Customers",
    group: "transaction"
  },
  "saleskeyed": {
    key: "salesKeyed",
    name: "Sales",
    group: "transaction"
  },
  "timecompletetrans": {
    key: "timeCompleteTrans",
    name: "Time to complete",
    group: "transaction"
  },
  "timeonsub-total": {
    key: "timeOnSubtotal",
    name: "Time on Sub-total",
    group: "transaction"
  },
  "timeonsale": {
    key: "timeOnSale",
    name: "Time on sale",
    group: "transaction"
  },
  "timeidle": {
    key: "timeIdle",
    name: "Idle Time",
    group: "transaction"
  },
}
const discountMapping = {
  "globaldiscount": {
    key: "globalDiscount",
    name: "Global Discount",
    group: "discount"
  },
  "customerdiscount": {
    key: "customerDiscount",
    name: "Customer Distcount",
    group: "discount"
  }
}
const markdownMapping = {
  "salesduringsaleperiod": {
    key: "salesPeriodSales",
    name: "Sale Items Sold",
    group: "markdown"
  },
  "salesduringtprperiod": {
    key: "tprPeriodSales",
    name: "TPR Items Sold",
    group: "markdown"
  },
  "salesduringinstoreperiod": {
    key: "instorePeriodSales",
    name: "Regular Items Sold",
    group: "markdown"
  },
  "temporarymarkdown": {
    key: "temporaryMarkDown",
    name: "Temporay Markdowns",
    group: "markdown"
  },
}

const getMapping = (key) => {
  const mappings = {...salesMapping,...loyaltyMapping,...couponMapping,...taxMapping,...exceptionMapping,...transactionMapping,...discountMapping,...markdownMapping};
  const map = mappings[key];
  if (map === undefined){
    return {
      group: "others"
    }
  }  
  return mappings[key]
}


const parseStat = (statCollection,stat) => {
  try {
    // const objCopy = structuredClone(obj);
    return [...statCollection,stat];
    // if (group === "others"){
    //   let othersArr = obj.length > 0 ? [...obj,stat] : [stat]; // update the stat group others array
    //   return othersArr;
    // }else{
    //   objCopy[key] = stat; // add a property to the statGroup obj
    // }
    // return objCopy;
  } catch (error) {
    console.error(error.message);
  }
}


class LocReportAdapter {

  parseStoreStatsData(data){
    try {

      if (!Array.isArray(data)) throw new TypeError("data not of type array");
      
      // New Map to collect the stat group objects while parsing
      const stateGroupMap = new Map();
      // Iterating through the data to parse the store stats from LOC POS
      data.forEach(row => {

        const {description,quantity,weight,total,group} = row;

        const lookup = Format.toCamelCase(description.replace(" 1",""));

        // Use the row object description as a key to find a mapping removing the 
        // spaces and making it lowercase
        const mapKey = removeAllSpaces(description.replace(" 1","").toLowerCase());


        /*
          Get mapping for stat. If mapping does not 
          exist, returns {key:"",group:"others"}
        */
        const mapping = getMapping(mapKey);

        
        let statGroup = mapping.group; // stat group from mapping
        let statKey =  mapping?.key ? mapping.key : lookup; // stat key from mapping
        let statName = mapping?.name ? Format.toCapitalized(mapping.name) : Format.toCapitalized(description.replace(" 1","")); // stat name from mapping
        let statGroupArr = [];

        // Create a new StatRecord object
        const newStat = new StatRecord({quantity,weight,total,group:statGroup,description:statName,lookup:statKey});
        
        // Check if an entry in the statGroupMap exists
        if (stateGroupMap.has(statGroup)){

          // Group exists in the statGroupMap
          statGroupArr = stateGroupMap.get(statGroup);

          statGroupArr = parseStat(statGroupArr,newStat);
          
          stateGroupMap.set(statGroup,statGroupArr);
          
        }else {
          // Group does not exist in the statGroupMap
    
          statGroupArr = parseStat([],newStat);
          
          stateGroupMap.set(statGroup,statGroupArr);

        }

      });
      
      return Object.fromEntries(stateGroupMap);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  parseStoreTotalsData(data){
    try {

      if (!Array.isArray(data)) throw new TypeError("data not of type array");
      // New Map to collect the stat group objects while parsing
      const stateGroupMap = new Map();
      
      // Iterating through the data to parse the store stats from LOC POS
      data.forEach(row => {

        const {description,quantity,weight,total,group} = row;



        const lookup = Format.toCamelCase(description);

        // Use the row object description as a key to find a mapping removing the 
        // spaces and making it lowercase
        const mapKey = removeAllSpaces(description.toLowerCase());

        /*
          Get mapping for stat. If mapping does not 
          exist, returns {key:"",group:"others"}
        */
        const mapping = getMapping(mapKey);

        
        let statGroup = mapping.group; // stat group from mapping
        let statKey =  mapping?.key ? mapping.key : group; // stat key from mapping
        let statName = mapping?.name ? mapping.name : description; // stat name from mapping
        let statGroupArr = [];

        // Create a new StatRecord object
        const newStat = new StatRecord({quantity,weight,total,group:statGroup,description:statName,lookup:statKey});
        
        // Check if an entry in the statGroupMap exists
        if (stateGroupMap.has(statGroup)){

          // Group exists in the statGroupMap
          statGroupArr = stateGroupMap.get(statGroup);

          statGroupArr = parseStat(statGroupArr,newStat);
          
          stateGroupMap.set(statGroup,statGroupArr);
          
        }else {
          // Group does not exist in the statGroupMap
    
          statGroupArr = parseStat([],newStat);
          
          stateGroupMap.set(statGroup,statGroupArr);

        }

      });
      
      return Object.fromEntries(stateGroupMap);
      
    } catch (error) {
      console.error(error.message);
    }
  }
  
  parseSafeDetails(data){
    try {
      if (!Array.isArray(data)) throw new TypeError("data not of type array");


    const dataSchema = {
      PickUp: {},
      Loan: {},
      SafeExpected: {},
      SafeDeposit: {},
      Received: {},
      OverShort: {},
      CashEnding: {},
    }

      
    data.forEach(row => {
      if (reportMap.has(row.Media)){
        const mediaMapObj = reportMap.get(row.Media);
        const type = row.Type.replace(" ","");
        mediaMapObj[type] = {
          description: row.Description,
          quantity: row.Quantity,
          total: row.Total
        }
        reportMap.set(row.Media,mediaMapObj);
      }else{
        const mediaMapObj = {
      PickUp: {},
      Loan: {},
      Expected: {},
      SafeDeposit: {},
      Received: {},
      ShortOver: {}
    }
        const type = row.Type.replace(" ","");
        mediaMapObj[type] = {
          description: row.Description,
          quantity: row.Quantity,
          total: row.Total
        }
        reportMap.set(row.Media,mediaMapObj)
      }

    })
    
    return reportMap;
    } catch (error) {
      
    }
  }

  
  
  parseHourlySales(data){
    try {
       if (!Array.isArray(data)) throw new TypeError("parameter not of type array");
       const hourMap = new Map();

       data.forEach(row => {
        const {description,hour} = row;

        const mapKey = removeAllSpaces(description.toLowerCase());
        /*
          Get mapping for stat. If mapping does not 
          exist, returns {key:"",group:"others"}
        */
        const mapping = getMapping(mapKey);

        if (mapping.group === "others") return;
        
        const newStatRecord = new StatRecord({...row,description:mapping.name,lookup:mapping.key,group:mapping.group});


        if (hourMap.has(mapping.key)){
          const hourlySales = hourMap.get(mapping.key);

          hourlySales.push(newStatRecord);

          hourMap.set(mapping.key,hourlySales)
        } else {
          hourMap.set(mapping.key,[newStatRecord]);
        }
        
       })
      
      return Object.fromEntries(hourMap);
    } catch (error) {
      console.error(error.message)
    }
  }

  parseDepartmentTotals(data,sort){
    try {
      if (!Array.isArray(data)) throw new TypeError("data is not of type array");
      const retTotalsArr = [];
      data.forEach(row => {
        const {description,number} = row;

        const lookup = Format.toCamelCase(description);
        const desc = Format.toCapitalized(description);

        const departmentTotalStat = new StatRecord({...row,number,description:desc,lookup,group:"deptartment_sales"});

        retTotalsArr.push(departmentTotalStat);
      })
      if (sort){
        return Sort.bySales(retTotalsArr,sort);
      }
      return retTotalsArr;
    } catch (error) {
      console.error(`[ERROR] [LocReportReportAdapter] [parseDepartmentTotals] - ${error.message}`);
    }
  }

  parseBalanceSheet(data){
    try {
      let temp = data;
      console.log("");

      const tenderMap = new Map();
      
      data.forEach(row => {
        const {description} = row;
        let group = row.group.toLowerCase();
        if (row.group.toLowerCase() === "information"){
          group = "sales"
        }

        group = removeAllSpaces(group);

        const lookup = description === "Coupon Able" ? Format.toCamelCase("couponable") : Format.toCamelCase(description);
        const desc = description === "Coupon Able" ? Format.toCapitalized("couponable") : Format.toCapitalized(description);

        const newStatRecord = new StatRecord({...row,description:desc,lookup,group})

        if (tenderMap.has(group)){
          const tenders = tenderMap.get(group);
          tenderMap.set(group,[...tenders,newStatRecord]);
        }else{
          tenderMap.set(group,[newStatRecord]);
        }
      })
   
      // const t = Object.fromEntries(tenderMap);
      return Object.fromEntries(tenderMap);;
    } catch (error) {
      console.error(`[ERROR] [LocReportReportAdapter] [parseBalanceSheet] - ${error.message}`);
    }
  }

  parseStoreTotals(data){
    try {
      // 
      let temp = data;
      console.log("");

      const tenderMap = new Map();

      data.forEach(row => {
        const {description} = row;

        const lookup = Format.toCamelCase(description);
        const desc = Format.toCapitalized(description);

        if (tenderMap.has(row.group)){
          const tenders = tenderMap.get(row.group);
          tenderMap.set(row.group,[...tenders,{...row,lookup,description:desc}]);
        }else{
          tenderMap.set(row.group,[{...row,lookup,description:desc}]);
        }
      })
      const t = Object.fromEntries(tenderMap);
      // 
      return t;
    } catch (error) {
      console.error(`[ERROR] [LocReportReportAdapter] [parseBalanceSheet] - ${error.message}`);
    }
  }

  parseWeekData(data){
    try {
      if (!data) return [];
      
      const tempObj = new Map();
      data.forEach(record => {
        if (record.WeekType.toLowerCase() === "current"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),thisWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,thisWeekSales:record.SalesAmount});            
          }          
        }
        if (record.WeekType.toLowerCase() === "prior"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),lastWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,lastWeekSales:record.SalesAmount});            
          }         
        }
      });
      
      let dataArray = [];
      for (const [key,value] of tempObj){
        dataArray.push(value);
      }
      
      return dataArray;
    } catch (error) {
      console.error(error.message);
    }
  }

  parse7DayBalanceSheet(data){
    try {
      if (!Array.isArray(data)) throw new TypeError("data parameter is not of type arrray");
      
      const deptTotalsMap = new Map();
      const storeTotalsMap = new Map();

      for (let i = 0; i < data.length; i++){
        const row = data[i];
        const {description} = row;
        const lookup = Format.toCamelCase(description);
        const fDescription = Format.toCapitalized(description);
        
        if (row.F03 !== 99999999){

          const newRecord = new StatRecord({...row,lookup,description:fDescription,number:row.F03});

          if (deptTotalsMap.has(newRecord.lookup)){
            const days = deptTotalsMap.get(newRecord.lookup);
            deptTotalsMap.set(newRecord.lookup,[...days,newRecord]);
          }else {
            deptTotalsMap.set(newRecord.lookup,[newRecord]);
          }
          continue;
        }
        // 
        // Use the row object description as a key to find a mapping removing the 
        // spaces and making it lowercase
        const mapKey = removeAllSpaces(description.toLowerCase());

        /*
          Get mapping for stat. If mapping does not 
          exist, returns {key:"",group:"others"}
        */
        const mapping = getMapping(mapKey);
        const newRecord = new StatRecord({...row,lookup,description:fDescription,group:mapping.group});

        if (storeTotalsMap.has(newRecord.lookup)){
          const days = storeTotalsMap.get(newRecord.lookup);
          storeTotalsMap.set(newRecord.lookup,[...days,newRecord]);
        }else{
          storeTotalsMap.set(newRecord.lookup,[newRecord])
        }

      }
      
      return {
        departmentTotals: Array.from(deptTotalsMap, ([lookup, value]) => ({ lookup, value })),
        saleTotals: Array.from(storeTotalsMap, ([lookup, value]) => ({ lookup, value }))
      }
    } catch (error) {
      console.error(error.message);
    }
  }

}

const LocDataAdapter = new LocReportAdapter();

export default LocDataAdapter;
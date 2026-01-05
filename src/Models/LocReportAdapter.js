import { calculatePercentChange, removeAllSpaces } from "../Utils/Utils";
import DepartmentRecord from './DepartmentRecord';
import DateUtility from "../Utils/DateUtils";
import StatRecord from "./StatRecord";
import Calculate from "../Utils/Caclulate";


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
  "tax1": {
    key: "tax",
    name: "Tax",
    group: "tax"
  },
  "taxable1": {
    key: "taxable",
    name: "Taxable",
    group: "tax"
  }
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
  }
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
    name: "Sales During Sales Period",
    group: "markdown"
  },
  "salesduringtprperiod": {
    key: "tprPeriodSales",
    name: "Sales During TPR Period",
    group: "markdown"
  },
  "salesduringinstoreperiod": {
    key: "instorePeriodSales",
    name: "Sales During Instore Period",
    group: "markdown"
  },
  "temporarymarkdown": {
    key: "temporaryMarkDown",
    name: "Temporay Markdowns",
    group: "markdown"
  },
}

const storeReportData = {
  loyalty: {
    pointsGiven: {},
    pointsRedeemed: {},
    transactions: {},
    items: {},
    customers: {},
  },
  sales: {
    totalSales: {},
    netSales: {},
    hashSales: {},
    costOfGoods: {},
    grandTotal: {},
    transactions: {}
  },
  coupons: {
    store: {},
    vendor: {},
    electronicStore: {},
    electronicVendor: {}    
  },
  tax: {
    tax: {},
    taxable: {},
    nonTaxable: {}
  },
  exceptions: {
    noSale: {},
    canceled: {},
    canceledItem: {},
    cancelPrevItem: {},
    refund: {},
    taxRefund: {}
  },
  safe: {},
  drawer: {},
  stats: {}
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

const findDepartment = (depts,id) => {
  if (!Array.isArray(depts)) throw new TypeError("depts not of type array");
  return depts.find(dept => parseInt(dept.departmentId) === parseInt(id));
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
      
      let temp =  Object.fromEntries(stateGroupMap);
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

  parseHomeViewData(data){
    try {
      if (!Array.isArray(data)) throw new TypeError("parameter not of type array");
      
      const todayStats = data[0];
      const prevStats = data[1];
      const todayDepts = data[2].map(d => new DepartmentRecord(d));
      const prevDepts = data[3].map(d => new DepartmentRecord(d));

      const parseSales = (salesData,compareData) => {
        const salesFilter = {
          totalSales: {
            title: "Revenue",
            format: "shortCurrency",
            property: "total"
          },
          costOfGoodsSold: {
            title: "COG Sold",
            format: "shortCurrency",
            property: "total"
          },
          margin: {
            title:"Margin",
            format: "percentage",    
          },
          avgBasket: {
            title: "Avg Basket",
            format: "currency"
          }
        }
        const salesStatArray = [];
        
        let totalSalesStat = {};
        let totalCostOfGoodsSoldStat = {};

        salesData.forEach(data => {
          if (data.lookup === "totalSales") {
            totalSalesStat = data;
          }
          if (data.lookup === "costOfGoodsSold") {
            totalCostOfGoodsSoldStat = data;
          }
          const statMeta = salesFilter[data.lookup];
          if (statMeta){
            const previousStat = compareData.filter(cd => cd.lookup === data.lookup)[0];
            const value = data[statMeta.property];
            salesStatArray.push({
              title: statMeta.title,
              format: statMeta.format,
              value: value,
              delta: Calculate.percentChange(previousStat[statMeta.property],value)
            })
          }
        })
        
        const prevTotalSalesStat = compareData.filter(cd => cd.lookup === totalSalesStat.lookup)[0];
        const prevTotalCostOfGoodsSoldStat = compareData.filter(cd => cd.lookup === totalCostOfGoodsSoldStat.lookup)[0];
        const marginStatMeta = salesFilter.margin;
        const avgBasketStatMeta = salesFilter.avgBasket;
        salesStatArray.push({
          title: avgBasketStatMeta.title,
          format: avgBasketStatMeta.format,
          value: totalSalesStat.total / totalSalesStat.quantity,
          delta: Calculate.percentChange(prevTotalSalesStat.total / prevTotalSalesStat.quantity,totalSalesStat.total / totalSalesStat.quantity)
        })
        salesStatArray.push({
          title: marginStatMeta.title,
          format: marginStatMeta.format,
          value: Calculate.margin(totalSalesStat.total,totalCostOfGoodsSoldStat.total),
          delta: Calculate.percentChange(Calculate.margin(prevTotalSalesStat.total,prevTotalCostOfGoodsSoldStat.total),Calculate.margin(totalSalesStat.total,totalSalesStat.total))
        })
        return salesStatArray;
      }
      const parseExceptions = (exceptionData,compareData) => {
        const exceptionFilter = {
          cancelPrevItem: {
            title: "Cancel Prev Item",
            format: "shortNumber",
            property: "quantity"
          },
          refunds: {
            title: "Refunds",
            format: "shortNumber",
            property: "quantity"
          },
          noSales: {
            title:"No Sales",
            format: "shortNumber",
            property: "quantity"    
          },
          cancelOrder: {
            title: "Canceled Orders",
            format: "shortNumber",
            property: "quantity"
          }
        }

        debugger;
        const exceptionStatsArray = [];
        exceptionData.forEach(data => {
          const statMeta = exceptionFilter[data.lookup];
          if (statMeta){
            exceptionStatsArray.push({
              title: statMeta.title,
              format: statMeta.format,
              value: data[statMeta.property],
              quantity: data.quantity,
              delta: Calculate.percentChange(data.quantity,data.quantity)
            })
          }
        })
        return exceptionStatsArray;
      }

      const homeViewData = {
        stats: parseSales(todayStats.sales,prevStats.sales),
        exceptions: parseExceptions(todayStats.exception,prevStats.exception)     
      }


      const departmentArray = [];

      todayDepts.forEach((department,index) => {
        const {departmentId,description,quantity,total,weight} = department;
        const prevDept = findDepartment(prevDepts,departmentId);
        let arrObj = {
          description: description,
          quantity: quantity,
          total: department.total,
          weight: weight,
          weightDelta: weight,
          prevTotal: prevDept ? prevDept.total : 0.00,
          prevQuantity: prevDept ? prevDept.quantity : 0,
          prevWeight: prevDept ? prevDept.weight : 0.00,
          quantityDelta: prevDept ? calculatePercentChange(prevDept.quantity,quantity) : 0,
          totalDelta: prevDept ? calculatePercentChange(prevDept.total,total) : 0.00,
        }
        departmentArray.push(arrObj);
      });

      homeViewData.departments = departmentArray;
      debugger;
      return homeViewData;

    } catch (error) {
      console.error(error.message)
    }
  }
  

}

const LocDataAdapter = new LocReportAdapter();

export default LocDataAdapter;
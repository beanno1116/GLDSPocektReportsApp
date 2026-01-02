import { m } from "motion/react";
import { calculatePercentChange, removeAllSpaces } from "../Utils/Utils";
import DateUtility from "../Utils/DateUtils";

const exceptionNameMappings = {
  "cancelprev.item": "Cancel prev item",
  "cancelorder": "Canceled orders",
  "refundkeyinfo": "Refunds",
  "taxexempt1": "Tax 1 Exemptions"
}
const salesGroups = {
  nrgt: "sales",
  sales: "sales",
  globaldiscount: "discounts",
  taxes: "taxes",
  plus: "plus",
  received: "received",
  itemdiscount: "discounts",
  information: "information",
  markdowns: "markdowns",
  poschecks: "backups",
  exceptions: "exceptions",
  statistics: "transaction",
  loyalty: "loyalty",
  buying: "purchasing",
  inventory: "inventory",
  costofgoods: "sales"
}

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
  const mappings = {...salesMapping,...loyaltyMapping,...couponMapping,...taxMapping,...exceptionMapping,...transactionMapping};
  return mappings[key]
}


class LocReportAdapter {

  parseStoreStatsData(data){
    try {

      if (!Array.isArray(data)) throw new TypeError("data not of type array");

      const stateGroupMap = new Map();


      data.forEach(row => {

        const {description,quantity,weight,total} = row;

        const mapKey = removeAllSpaces(description.toLowerCase());

        const mapping = getMapping(mapKey);

        if (mapping === undefined) return;
        
        let statGroup = mapping.group;
        let statKey = mapping.key;
        
        
        if (stateGroupMap.has(statGroup)){

          let groupObj = stateGroupMap.get(statGroup);

          groupObj[statKey] = {
            description: mapping.name,
            group: statGroup,
            quantity,
            weight,
            total
          }   

          stateGroupMap.set(statGroup,groupObj);

        }else {

          const groupObj = {};

          groupObj[mapping.key] = {
            description: mapping.name,
            group: statGroup,
            quantity,
            weight,
            total
          }        

          stateGroupMap.set(statGroup,groupObj);

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

  parseHomeViewData(data){
    try {
      debugger;
      if (!Array.isArray(data)) throw new TypeError("parameter not of type array");
      
      const todayStats = data[0];
      const prevStats = data[1];
      const todayDepts = data[2];
      const prevDepts = data[3];
      debugger;
      const homeViewData = {
        stats: [
          {
            title: "Revenue",
            format: "shortCurrency",
            value: todayStats.sales.totalSales.total,
            delta: calculatePercentChange((prevStats.sales.totalSales.total,todayStats.sales.totalSales.total))
          },
          {
            title: "Transactions",
            format: "shortNumber",
            value: todayStats.sales.totalSales.quantity,
            delta: calculatePercentChange(prevStats.sales.totalSales.quantity,todayStats.sales.totalSales.quantity)
          },
          {
            title: "Avg Basket",
            format: "currency",
            value: todayStats.sales.totalSales.total / todayStats.sales.totalSales.quantity,
            delta: calculatePercentChange(prevStats.sales.totalSales.total / prevStats.sales.totalSales.quantity,todayStats.sales.totalSales.total / todayStats.sales.totalSales.quantity)
          },
          {
            title: "Margin",
            format: "percentage",
            value: "28.4%",
            delta: "↓ 1.2%"
          }
        ],
        exceptions: [
          {
            title: todayStats.exception.cancelOrder.description,
            format: "shortNumber",
            value: todayStats.exception.cancelOrder.quantity,
            delta: "↓ 1.2%"
          },
          {
            title: todayStats.exception.noSales.description,
            format: "shortNumber",
            value: todayStats.exception.noSales.total,
            delta: "↓ 1.2%"
          },
          {
            title: todayStats.exception.cancelPrevItem.description,
            format: "shortNumber",
            value: todayStats.exception.cancelPrevItem.quantity,
            delta: "↓ 1.2%"
          },
          {
            title: todayStats.exception.refunds.description,
            format: "shortNumber",
            value: todayStats.exception.refunds.total,
            delta: "↓ 1.2%"
          },
        ]
        // exceptions: todayStats.exceptions.map(exception => {          
        //   return {
        //     title: exceptionNameMappings[exception.description.toLowerCase().replace(/ /g, '')],
        //     format: "shortNumber",
        //     value: exception.total,
        //     delta: "↓ 1.2%"
        //   }
        // })        
      }


      const departmentArray = [];

      todayDepts.forEach((department,index) => {
        const {description,quantity,total,weight} = department;
        const prevDept = prevDepts[index];
        let arrObj = {
          description: description,
          quantity: quantity,
          prevQuantity: prevDept.quantity,
          quantityDelta: calculatePercentChange(prevDept.quantity,quantity),
          total: department.total,
          prevTotal: prevDept.total,
          totalDelta: calculatePercentChange(prevDept.total,total),
          weight: weight,
          prevWeight: prevDept.weight,
          weightDelta: weight,
        }
        departmentArray.push(arrObj);
      });

      homeViewData.departments = departmentArray;

      return homeViewData;

    } catch (error) {
      
    }
  }

}

const LocDataAdapter = new LocReportAdapter();

export default LocDataAdapter;
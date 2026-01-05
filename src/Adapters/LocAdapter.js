import StatRecord from "../Models/StatRecord";


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







const getMapping = (key) => {
  const mappings = {...salesMapping,...loyaltyMapping,...couponMapping,...taxMapping,...exceptionMapping,...transactionMapping,...discountMapping,...markdownMapping};
  const map = mappings[key];
  if (map === undefined){
    return {
      key: "",
      group: "others"
    }
  }  
  return mappings[key]
}


const parseStat = (obj,stat,group,key) => {
  try {
    const objCopy = structuredClone(obj);
    if (group === "others"){
      objCopy[group] = objCopy[group] ? [...objCopy[group],stat] : [stat]; // update the stat group others array
    }else{
      objCopy[key] = stat; // add a property to the statGroup obj
    }
    return objCopy;
  } catch (error) {
    console.error(error.message);
  }
}


class LocAdapter {

    parseStoreStatsData(data){
    try {

      if (!Array.isArray(data)) throw new TypeError("data not of type array");

      // New Map to collect the stat group objects while parsing
      const stateGroupMap = new Map();

      // Iterating through the data to parse the store stats from LOC POS
      data.forEach(row => {

        const {description,quantity,weight,total} = row;

        // Use the row object description as a key to find a mapping removing the 
        // spaces and making it lowercase
        const mapKey = removeAllSpaces(description.toLowerCase());

        /*
          Get mapping for stat. If mapping does not 
          exist, returns {key:"",group:"others"}
        */
        const mapping = getMapping(mapKey);

        
        let statGroup = mapping.group; // stat group from mapping
        let statKey =  mapping.key; // stat key from mapping
        let statName = mapping?.name ? mapping.name : description; // stat name from mapping
        let groupObj = {};

        // Create a new StatRecord object
        const newStat = new StatRecord({quantity,weight,total,group:statGroup,description:statName});
        
        // Check if an entry in the statGroupMap exists
        if (stateGroupMap.has(statGroup)){

          // Group exists in the statGroupMap
          groupObj = stateGroupMap.get(statGroup);

          groupObj = parseStat(groupObj,newStat,statGroup,statKey);
          
          stateGroupMap.set(statGroup,groupObj);
          
        }else {
          // Group does not exist in the statGroupMap
    
          groupObj = parseStat(groupObj,newStat,statGroup,statKey);
          
          stateGroupMap.set(statGroup,groupObj);

        }

      });

      
      return Object.fromEntries(stateGroupMap);
      
    } catch (error) {
      console.error(error.message);
    }
  }
}
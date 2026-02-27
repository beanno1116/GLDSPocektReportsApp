import StatRecord from "../../../../Models/StatRecord";
import DateUtility from "../../../../Utils/DateUtils";
import Sort from "../../../../Utils/Sort";



const formatHourlySales = (salesObj,baseSalesObj) => {
  try {    
    
    const createSalesTotalObj = (obj,baseObj) => {
      const retObj = {};
      const totalSalesArr = [];
      baseObj.totalSales.forEach(baseSale => {
        const {hour} = baseSale;
        const index = obj?.totalSales ? obj.totalSales.findIndex(sale => sale.hour === hour) : -1;
        if (index === -1){
          totalSalesArr.push({
            hour,
            base: baseSale.total / 365,
            current: 0
          })
          return;
        };
        const {total} = obj.totalSales[index];
        totalSalesArr.push({
          hour,
          base: baseSale.total / 365,
          current: total
        })
      })

      const salesObjSorted = Sort.hourlySales(obj.totalSales);
      const baseSalesObjSorted = Sort.hourlySales(baseObj.totalSales);
      const baseLength = baseSalesObjSorted.length - 1;

      const baseObjMax = baseSalesObjSorted[0];
      const baseObjMin = baseSalesObjSorted[baseLength];


      retObj.data = totalSalesArr;
      retObj.min = {
        hour: baseObjMin.hour,
        total: baseObjMin.total / 365,
        format: "shortCurrency"
      };
      retObj.max = {
        hour: baseObjMax.hour,
        total: baseObjMax.total / 365,
        format: "shortCurrency"
      };
      return retObj;
    }
    
    const createItemTotalObj = (obj,baseObj) => {
      const retObj = {};
      const totalSalesArr = [];
      baseObj.items.forEach(baseSale => {
        const {hour} = baseSale;
        const index = obj?.items ? obj.items.findIndex(sale => sale.hour === hour) : -1;
        if (index === -1){
          totalSalesArr.push({
            hour,
            base: baseSale.quantity / 365,
            current: 0
          })
          return;
        };
        const {quantity} = obj.items[index];
        totalSalesArr.push({
          hour,
          base: baseSale.quantity / 365,
          current: quantity
        })
      })

      const salesObjSorted = Sort.hourlyQuantity(obj.items);
      const baseSalesObjSorted = Sort.hourlyQuantity(baseObj.items);
      const baseLength = baseSalesObjSorted.length - 1;

      const baseObjMax = baseSalesObjSorted[0];
      const baseObjMin = baseSalesObjSorted[baseLength];


      retObj.data = totalSalesArr;
      retObj.min = {
        hour: baseObjMin.hour,
        total: baseObjMin.quantity / 365,
        format: "shortNumber"
      };
      retObj.max = {
        hour: baseObjMax.hour,
        total: baseObjMax.quantity / 365,
        format: "shortNumber"
      };
      return retObj;
    }
    
    const createTransactionTotalObj = (obj,baseObj) => {
      const retObj = {};
      const totalSalesArr = [];
      baseObj.totalSales.forEach(baseSale => {
        const {hour} = baseSale;
        const index = obj?.totalSales ? obj.totalSales.findIndex(sale => sale.hour === hour) : -1;
        if (index === -1){
          totalSalesArr.push({
            hour,
            base: baseSale.quantity / 365,
            current: 0
          })
          return;
        };
        const {quantity} = obj.totalSales[index];
        totalSalesArr.push({
          hour,
          base: baseSale.quantity / 365,
          current: quantity
        })
      })

      const salesObjSorted = Sort.hourlyQuantity(obj.totalSales);
      const baseSalesObjSorted = Sort.hourlyQuantity(baseObj.totalSales);
      const baseLength = baseSalesObjSorted.length - 1;

      const baseObjMax = baseSalesObjSorted[0];
      const baseObjMin = baseSalesObjSorted[baseLength];


      retObj.data = totalSalesArr;
      retObj.min = {
        hour: baseObjMin.hour,
        total: baseObjMin.quantity / 365,
        format: "shortNumber"
      };
      retObj.max = {
        hour: baseObjMax.hour,
        total: baseObjMax.quantity / 365,
        format: "shortNumber"
      };
      return retObj;
    }
    
    const createTBasketTotalObj = (obj,baseObj) => {
      const retObj = {};
      const totalSalesArr = [];
      baseObj.totalSales.forEach(baseSale => {
        const {hour} = baseSale;
        const index = obj.totalSales ? obj.totalSales.findIndex(sale => sale.hour === hour) : -1;
        if (index === -1){
          totalSalesArr.push({
            hour,
            base: baseSale.total / baseSale.quantity,
            current: 0
          })
          return;
        };
        const {total,quantity} = obj.totalSales[index];
        totalSalesArr.push({
          hour,
          base: baseSale.total / baseSale.quantity,
          current: total / quantity
        })
      })

      const salesObjSorted = Sort.byHourlyBasket(obj.totalSales);
      const baseSalesObjSorted = Sort.byHourlyBasket(baseObj.totalSales);
      const baseLength = baseSalesObjSorted.length - 1;

      const baseObjMax = baseSalesObjSorted[0];
      const baseObjMin = baseSalesObjSorted[baseLength];


      retObj.data = totalSalesArr;
      retObj.min = {
        hour: baseObjMin.hour,
        total: baseObjMin.total / baseObjMin.quantity,
        format: "currency"
      };
      retObj.max = {
        hour: baseObjMax.hour,
        total: baseObjMax.total / baseObjMax.quantity,
        format: "currency"
      };      
      return retObj;
    }


    return {
      totalSales: createSalesTotalObj(salesObj,baseSalesObj),
      items: createItemTotalObj(salesObj,baseSalesObj),
      transactions: createTransactionTotalObj(salesObj,baseSalesObj),
      basket: createTBasketTotalObj(salesObj,baseSalesObj)
    }
    
  } catch (error) { 
    console.error(error.message);
  }
}

const formatDepartmentSales = (deptsObj,baseDeptsObj) => {
  try {
    return deptsObj;
  } catch (error) {
    console.error(error.message);
  }
}

const format7DayTotalSales = (salesTotals) => {
  try {
    if (!Array.isArray(salesTotals) || !salesTotals) return new Error("data parameter not of type Array or undefined");
    const totalSales = salesTotals.find(total => total.lookup === "totalSales");
    if (!totalSales) return [];
    
    const weekData = [];
    let currentDay = undefined;
    for (let i = 0; i < 7; i++){
      
      if (i < totalSales.value.length){
        const value = totalSales.value[i];
        currentDay = new Date(value.day);
        const totalObj = {
          name: DateUtility.getDayName(currentDay),
          total: value.total,
          quantity: value.quantity
        }
        weekData.push(totalObj);
        continue;
      }
      currentDay = DateUtility.addDays(currentDay,1);
      const totalObj = {
        name: DateUtility.getDayName(currentDay),
        total: 0.00,
        quantity: 0
      }
      weekData.push(totalObj);
    }
    return weekData;
  } catch (error) {
    
  }

}
const salesViewAdapter = (data) => {
  try {
    if (!Array.isArray(data) || !data) return new Error("data parameter not of type Array or undefined");

    debugger
    const hourlySales = data[0];
    const baseHourlySales = data[1];
    const departmentTotals = data[2];
    const baseDepartmentTotals = data[3];
    const balanceSheet = data[4];
    const salesSevenDay = format7DayTotalSales(data[5].saleTotals);
    

    const hourlySalesData = formatHourlySales(hourlySales,baseHourlySales);
    const departmentSalesData = formatDepartmentSales(departmentTotals,baseDepartmentTotals);

    return {
      hourlyData: hourlySalesData,
      balanceSheet,
      departmentSales: departmentSalesData,
      sevenDayTotalSales: salesSevenDay
    }
    
  } catch (error) {
    console.error(error.message);
  }
}

export default salesViewAdapter
import DepartmentRecord from "../../../Models/DepartmentRecord";
import StatRecord from "../../../Models/StatRecord";
import Calculate from "../../../Utils/Caclulate";

const selectStatGroup = (statObj) => {
  return (group,statName) => {
    try {
      if (Object.keys(statObj).length === 0) return new StatRecord();
      const statGroup = statObj[group];
      if (statGroup){
        const filteredStats = statGroup.filter(g => g.lookup === statName);
        if (filteredStats.length > 0){
          return filteredStats[0];
        }
      }
      return new StatRecord();
    } catch (error) {
      console.error(`[ERROR] [LocReportAdapter] [selectStatGroup] - ${error.message}`);
    }
  }
}

const findDepartment = (depts,id) => {
  if (!Array.isArray(depts)) throw new TypeError("depts not of type array");
  return depts.find(dept => parseInt(dept.departmentId) === parseInt(id));
}

const parseSalesData = (sales,salesBase) => {
  try {
    if (!sales || !salesBase) throw new Error("Parameters are not null or undefined");
    if (!sales || Object.keys(sales).length <= 1) return [];

    const tileData = []
    const selectStat = selectStatGroup(sales);
    const selectBaseStat = selectStatGroup(salesBase);
    
    const totalSalesStat = selectStat("sales","totalSales");
    const totalSalesBaseStat = selectBaseStat("sales","totalSales");
    const cogStat = selectStat("sales","costOfGoodsSold");
    const cogBaseStat = selectBaseStat("sales","costOfGoodsSold");
    const transCountStat = selectStat("transaction","customers");
    const transCountBaseStat = selectBaseStat("transaction","customers");
    const loyaltyTransCountStat = selectStat("loyalty","customers");
    const loyaltyTransCountBaseStat = selectBaseStat("loyalty","customers");

    // Revenue Tile
    tileData.push({
      title: "Revenue",
      format: "shortCurrency",
      value: totalSalesStat.total,
      bValue: totalSalesBaseStat?.total ? totalSalesBaseStat.total : 0.00,
      delta: Calculate.percentChange(totalSalesBaseStat?.total,totalSalesStat.total),
      quantity: parseInt(totalSalesStat.quantity),
      bQuantity: totalSalesBaseStat?.quantity ? parseInt(totalSalesBaseStat.quantity) : 0,
      qDelta: Calculate.percentChange(totalSalesBaseStat?.quantity,totalSalesStat.quantity),
      weight: totalSalesStat.weight,
      bWeight: totalSalesBaseStat?.weight ? totalSalesBaseStat.weight : 0.00,
      wDelta: Calculate.percentChange(totalSalesBaseStat?.weight,totalSalesStat.weight),
    })

    // Cost of goods tile
    tileData.push({
      title: "COG Sold",
      format: "shortCurrency",
      value: cogStat.total,
      bValue: cogBaseStat?.total ? cogBaseStat.total : 0.00,
      delta: Calculate.percentChange(cogBaseStat.total,cogStat.total),
      quantity: parseInt(cogStat.quantity),
      bQuantity: cogBaseStat?.quantity ? cogBaseStat.quantity : 0,
      qDelta: Calculate.percentChange(cogBaseStat?.quantity,cogStat.quantity),
      weight: cogStat.weight,
      bWeight: cogBaseStat?.weight ? cogBaseStat.weight : 0.00,
      wDelta: Calculate.percentChange(cogBaseStat?.weight,cogStat.weight),

    })

    // Average basket total tile
    tileData.push({
    title: "Avg Basket",
    format: "currency",    
    value: totalSalesStat.total === 0 ? 0 : totalSalesStat.total / totalSalesStat.quantity,
    bValue: 0.00,
    delta: totalSalesStat.total === 0 ? 0 : Calculate.percentChange(totalSalesBaseStat.total / totalSalesBaseStat.quantity,totalSalesStat.total / totalSalesStat.quantity),
    quantity: 0,
    bQuantity: 0,
    qDelta: 0,
    weight: 0.00,
    bWeight: 0.00,
    wDelta: 0
    })

    // Margin tile
    tileData.push({
      title: "Margin",
      format: "percentage",
      value: Calculate.margin(totalSalesStat.total,cogStat.total),
      bValue: 0.00,
      delta: Calculate.percentChange(Calculate.margin(totalSalesBaseStat.total,cogBaseStat.total),Calculate.margin(totalSalesStat.total,cogStat.total)),
      quantity: 0,
      bQuantity: 0,
      qDelta: 0,
      wieght: 0.00,
      bWeight: 0.00,
      wDelta: 0
    })

    // Transaction count tile
    tileData.push({
      title: "Transactions",
      format: "intFormat",
      value: parseInt(transCountStat.quantity),
      bValue: parseInt(transCountBaseStat.quantity),
      delta: Calculate.percentChange(transCountBaseStat.quantity,transCountStat.quantity),
      quantity: parseInt(transCountStat.quantity),
      bQuantity: parseInt(transCountBaseStat.quantity),
      qDelta: Calculate.percentChange(transCountBaseStat.quantity,transCountStat.quantity),
      wieght: 0.00,
      bWeight: 0.00,
      wDelta: 0
    })

    // Loyalty Transaction count tile
    tileData.push({
      title: "Loyalty Trans.",
      format: "intFormat",
      value: parseInt(loyaltyTransCountStat.quantity),
      bValue: parseInt(loyaltyTransCountBaseStat.quantity),
      delta: Calculate.percentChange(loyaltyTransCountBaseStat.quantity,loyaltyTransCountStat.quantity),
      quantity: parseInt(loyaltyTransCountStat.quantity),
      bQuantity: parseInt(loyaltyTransCountBaseStat.quantity),
      qDelta: Calculate.percentChange(loyaltyTransCountBaseStat.quantity,loyaltyTransCountStat.quantity),
      wieght: 0.00,
      bWeight: 0.00,
      wDelta: 0
    })

    return tileData;

  } catch (error) {
    console.error(error);
    return [];
  }
}

const parseExceptions = (exceptions,exceptionsBase) => {
  try {
    if (!exceptions || !exceptionsBase) throw new Error("Parameters are null or undefined");
    // if (!exceptions || Object.keys(exceptions).length <= 1) return [];
    const statSelector = selectStatGroup(exceptions);
    const baseStatSelector = selectStatGroup(exceptionsBase);
    const cancelPrevItemStat = statSelector("exception","cancelPrevItem");
    const baseCancelPrevItemStat = baseStatSelector("exception","cancelPrevItem");
    const cancelOrderStat = statSelector("exception","cancelOrder");
    const baseCancelOrderStat = baseStatSelector("exception","cancelOrder");
    const refundsStat = statSelector("exception","refunds");
    const baseRefundsStat = baseStatSelector("exception","refunds");
    const noSalesStat = statSelector("exception","noSales");
    const baseNoSalesStat = baseStatSelector("exception","noSales");

    const tileArray = [];
    debugger
    if (cancelPrevItemStat.quantity !== 0){
      tileArray.push({
        title: "Cancel Prev Item",
        format: "number",
        value: cancelPrevItemStat.quantity,
        delta: Calculate.percentChange(baseCancelPrevItemStat.quantity,cancelPrevItemStat.quantity)
      })
    }
    if (refundsStat.quantity !== 0){
      tileArray.push({
        title: "Refunds",
        format: "number",        
        value: refundsStat.quantity,
        delta: Calculate.percentChange(baseRefundsStat.quantity,refundsStat.quantity)
      })
    }
    if (noSalesStat.quantity !== 0){
      tileArray.push({
        title: "No Sales",
        format: "number",
        value: noSalesStat.quantity,
        delta: Calculate.percentChange(baseNoSalesStat.quantity,noSalesStat.quantity)
      })
      if (cancelOrderStat.quantity !== 0){
        tileArray.push({
        title: "Canceled Orders",
        format: "number",
        value: cancelOrderStat.quantity,
        delta: Calculate.percentChange(baseCancelOrderStat.quantity,cancelOrderStat.quantity)
      })
      }
    }
    return tileArray;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

const parseDepartmentData = (departments,departmentsBase) => {
  try {
    const departmentArray = [];

      departments.forEach((department,index) => {
        const {departmentId,description,quantity,total,weight} = department;
        const prevDept = findDepartment(departmentsBase,departmentId);
        let arrObj = {
          description: description,
          quantity: parseInt(quantity),
          total: department.total,
          weight: weight,
          weightDelta: weight,
          prevTotal: prevDept ? prevDept.total : 0.00,
          prevQuantity: prevDept ? prevDept.quantity : 0,
          prevWeight: prevDept ? prevDept.weight : 0.00,
          quantityDelta: prevDept ? Calculate.percentChange(prevDept.quantity,quantity) : 0,
          totalDelta: prevDept ? Calculate.percentChange(prevDept.total,total) : 0.00,
        }
        departmentArray.push(arrObj);
      });
      return departmentArray;
  } catch (error) {
    console.error(error.message);
    return []
  }
}

const viewAdapter = (data) => {
  try {
    if (!Array.isArray(data)) throw new TypeError("parameter not of type array");
    
    const todayStats = data[0];
    const prevStats = data[1];
    const todayDepts = data[2];
    const prevDepts = data[3];

    return {
      stats: parseSalesData(todayStats,prevStats),
      exceptions: parseExceptions(todayStats,prevStats),
      departments: parseDepartmentData(todayDepts,prevDepts)
    };

  } catch (error) {
    console.error(error.message)
  }
}

export default viewAdapter;

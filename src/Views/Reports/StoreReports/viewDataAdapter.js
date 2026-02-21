
import StatRecord from "../../../Models/StatRecord";
import Calculate from "../../../Utils/Caclulate";
import Format from "../../../Utils/Format";



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



const generalStatsTiles = (statSelector,baseStateSelector) => {
  const totalSalesStat = statSelector("sales","totalSales");
  const baseTotalSalesStat = baseStateSelector("sales","totalSales");
  const costOfGoodsSoldStat = statSelector("sales","costOfGoodsSold");
  const baseCostOfGoodsSoldStat = baseStateSelector("sales","costOfGoodsSold");

  const tileArray = [];

  const totalSalesTile = {
    title: "Revenue",
    format: "shortCurrency",
    value: totalSalesStat.total,
    bValue: baseTotalSalesStat?.total ? baseTotalSalesStat.total : 0.00,
    delta: Calculate.percentChange(baseTotalSalesStat?.total,totalSalesStat.total),
    quantity: parseInt(totalSalesStat.quantity),
    bQuantity: baseTotalSalesStat?.quantity ? parseInt(baseTotalSalesStat.quantity) : 0,
    qDelta: Calculate.percentChange(baseTotalSalesStat?.quantity,totalSalesStat.quantity),
    weight: totalSalesStat.weight,
    bWeight: baseTotalSalesStat?.weight ? baseTotalSalesStat.weight : 0.00,
    wDelta: Calculate.percentChange(baseTotalSalesStat?.weight,totalSalesStat.weight),
  }

  const costOfGoodsSoldTile = {
    title: "COG Sold",
    format: "shortCurrency",
    value: costOfGoodsSoldStat.total,
    bValue: baseCostOfGoodsSoldStat?.total ? baseCostOfGoodsSoldStat.total : 0.00,
    delta: Calculate.percentChange(baseCostOfGoodsSoldStat.total,costOfGoodsSoldStat.total),
    quantity: parseInt(costOfGoodsSoldStat.quantity),
    bQuantity: baseCostOfGoodsSoldStat?.quantity ? baseCostOfGoodsSoldStat.quantity : 0,
    qDelta: Calculate.percentChange(baseCostOfGoodsSoldStat?.quantity,costOfGoodsSoldStat.quantity),
    weight: costOfGoodsSoldStat.weight,
    bWeight: baseCostOfGoodsSoldStat?.weight ? baseCostOfGoodsSoldStat.weight : 0.00,
    wDelta: Calculate.percentChange(baseCostOfGoodsSoldStat?.weight,costOfGoodsSoldStat.weight),

  }

  const averageBasketTile = {
    title: "Avg Basket",
    format: "currency",    
    value: totalSalesStat.total === 0 ? 0 : totalSalesStat.total / totalSalesStat.quantity,
    bValue: 0.00,
    delta: totalSalesStat.total === 0 ? 0 : Calculate.percentChange(baseTotalSalesStat.total / baseTotalSalesStat.quantity,totalSalesStat.total / totalSalesStat.quantity),
    quantity: 0,
    bQuantity: 0,
    qDelta: 0,
    weight: 0.00,
    bWeight: 0.00,
    wDelta: 0
  }

  const marginTile = {
    title: "Margin",
    format: "percentage",
    value: Calculate.margin(totalSalesStat.total,costOfGoodsSoldStat.total),
    bValue: 0.00,
    delta: Calculate.percentChange(Calculate.margin(baseTotalSalesStat.total,baseCostOfGoodsSoldStat.total),Calculate.margin(totalSalesStat.total,costOfGoodsSoldStat.total)),
    quantity: 0,
    bQuantity: 0,
    qDelta: 0,
    wieght: 0.00,
    bWeight: 0.00,
    wDelta: 0
  }

  if (totalSalesStat.total !== 0.00){
    tileArray.push(totalSalesTile);
    tileArray.push(costOfGoodsSoldTile);
    tileArray.push(averageBasketTile);
  }
  if (costOfGoodsSoldStat.total !== 0.00){
    tileArray.push(marginTile);
  }
  

  return tileArray;
}

const loyaltyStatsTileData = (statSelector,baseStatSelector) => {
  try {
    if (!statSelector || !baseStatSelector) throw new Error("expected parameter of function, receieved undefined");
    const customerStat = statSelector("loyalty","customers");
    const baseCustomerStat = baseStatSelector("loyalty","customers");
    const itemStat = statSelector("loyalty","items");
    const baseItemStat = baseStatSelector("loyalty","items");
    const pointsGivenStat = statSelector("loyalty","pointsGiven");
    const basePointsGivenStat = baseStatSelector("loyalty","pointsGiven");
    const pointsRedeemedStat = statSelector("loyalty","pointsRedeemed");
    const basepointsRedeemedStat = baseStatSelector("loyalty","pointsRedeemed");

    const tileArray = [];
    if (customerStat.total !== 0.00){
      tileArray.push({
        title: "Spending",
        format: "shortCurrency",
        value: customerStat.total,
        delta: Calculate.percentChange(baseCustomerStat.total,customerStat.total)
      })
    }
    if (itemStat.quantity !== 0){
      tileArray.push({
        title: "Items",
        format: "intFormat",
        value: itemStat.quantity,
        delta: Calculate.percentChange(baseItemStat.quantity,itemStat.quantity)
      })
    }
    if (pointsGivenStat.quantity !== 0){
      tileArray.push({
        title: "Points Given",
        format: "shortNumber",
        value: pointsGivenStat.quantity,
        delta: Calculate.percentChange(basePointsGivenStat.quantity,pointsGivenStat.quantity)
      })
      if (pointsRedeemedStat.quantity !== 0){
        tileArray.push({
        title: "Points Redeemed",
        format: "shortNumber",
        value: pointsRedeemedStat.quantity,
        delta: Calculate.percentChange(basepointsRedeemedStat.quantity,pointsRedeemedStat.quantity)
      })
      }
    }
    return tileArray;
  } catch (error) {
    
  }
}

const couponListItemsData = (currentData,baseData) => {
  try {
    
    if (!currentData) return [];
    return currentData.map(data => {
      let base = baseData.filter(d => d.lookup === data.lookup)[0];         
      return {
        title: data.description,
        format: "shortNumber",
        value: data.total,
        bValue: base?.total ? base.total : 0.00,
        delta: Calculate.percentChange(base?.total,data.total),
        quantity: Format.asNumber(parseInt(data.quantity)),
        bQuantity: base?.quantity ? parseInt(base?.quantity) : 0,
        qDelta: Calculate.percentChange(base?.quantity,data.quantity),
        weight: data.weight,
        bWeight: base?.weight ? base.weight : 0.00,
        wDelta: Calculate.percentChange(base?.weight,data.weight)
      }
    })
  } catch (error) {
    
  }
}

const taxListItemsData = (currentData,baseData) => {
  try {
     if (!currentData) return [];
    return currentData.map(data => {
      let base = baseData.filter(d => d.lookup === data.lookup)[0];
      return {
        title: data.description,
        format: "shortNumber",
        value: data.total,
        bValue: base?.total ? base.total : 0.00,
        delta: Calculate.percentChange(base?.total,data.total),
        quantity: Format.asNumber(parseInt(data.quantity)),
        // quantity: parseInt(data.quantity),
        bQuantity: base?.quantity ? parseInt(base?.quantity) : 0,
        qDelta: Calculate.percentChange(base?.quantity,data.quantity),
        weight: data.weight,
        bWeight: base?.weight ? base.weight : 0.00,
        wDelta: Calculate.percentChange(base?.weight,data.weight)
      }
    })
  } catch (error) {
    
  }
}

const exceptionStatsTileData = (statSelector,baseStatSelector) => {
  try {
    if (!statSelector || !baseStatSelector) throw new Error("expected parameter of function, receieved undefined");
    const cancelPrevItemStat = statSelector("exception","cancelPrevItem");
    const baseCancelPrevItemStat = baseStatSelector("exception","cancelPrevItem");
    const cancelOrderStat = statSelector("exception","cancelOrder");
    const baseCancelOrderStat = baseStatSelector("exception","cancelOrder");
    const refundsStat = statSelector("exception","refunds");
    const baseRefundsStat = baseStatSelector("exception","refunds");
    const noSalesStat = statSelector("exception","noSales");
    const baseNoSalesStat = baseStatSelector("exception","noSales");

    const tileArray = [];

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
    
  }
}

const transactionStatsTileData = (statSelector,baseStatSelector) => {
  try {
    if (!statSelector || !baseStatSelector) throw new Error("expected parameter of function, receieved undefined");
    const transactionCountStat = statSelector("transaction","customers");
    const baseTransactionCountStat = baseStatSelector("transaction","customers");
    const timeCompleteTrans = statSelector("transaction","timeCompleteTrans");
    const transIdleTime = statSelector("transaction","timeIdle");
    const itemsStat = statSelector("transaction","items");
    const baseItemsStat = baseStatSelector("transaction","items");

    const tileArray = [];

    if (transactionCountStat.quantity !== 0){
      tileArray.push({
        title: "Count",
        format: "number",
        value: parseInt(transactionCountStat.quantity),
        delta: Calculate.percentChange(baseTransactionCountStat.quantity,transactionCountStat.quantity)
      })
    }
    if (itemsStat.quantity !== 0){
      tileArray.push({
        title: "Items",
        format: "number",
        value: parseInt(itemsStat.quantity),
        delta: Calculate.percentChange(baseItemsStat.quantity,itemsStat.quantity)
      })
    }
    if (timeCompleteTrans.quantity !== 0){
      tileArray.push({
        title: "Avg Sale Time",
        format: "shortMinute",
        // value: parseInt(Calculate.divide(timeCompleteTrans.quantity,60)),
        value: timeCompleteTrans.quantity === 0 ? 0 : parseInt(Calculate.divide(timeCompleteTrans.quantity / transactionCountStat.quantity,60)),
        delta: Calculate.percentChange(timeCompleteTrans.quantity,timeCompleteTrans.quantity)
      })
      if (transIdleTime.quantity !== 0){
        tileArray.push({
        title: "Avg Idle Time",
        format: "shortMinute",
        value: transIdleTime.quantity === 0 ? 0 : parseInt(Calculate.divide(transIdleTime.quantity / transactionCountStat.quantity,60)),
        delta: Calculate.percentChange(transIdleTime.quantity,transIdleTime.quantity)
      })
      }
    }
    return tileArray;
  } catch (error) {
    
  }
}

const markDownStatsData = (currentData,baseData) => {
  try {
     if (!currentData) return [];
     return currentData.map(data => {
      let base = baseData.filter(d => d.lookup === data.lookup)[0];      
      return {
        title: data.description,
        format: "shortNumber",
        value: data.total,
        bValue: base?.total ? base.total : 0.00,
        delta: Calculate.percentChange(base?.total,data.total),
        quantity: Format.asNumber(parseInt(data.quantity)),
        bQuantity: base?.quantity ? parseInt(base?.quantity) : 0,
        qDelta: Calculate.percentChange(base?.quantity,data.quantity),
        weight: data.weight,
        bWeight: base?.weight ? base.weight : 0.00,
        wDelta: Calculate.percentChange(base?.weight,data.weight)
      }
    })
  } catch (error) {
    
  }
}


export const viewAdapter = (currentData,baseData,weekData) => {
  try {
    
    // if (!Array.isArray(currentData) || !Array.isArray(baseData)) throw new TypeError("parameter not of type array");
    const statSelector = selectStatGroup(currentData);
    const baseStatSelector = selectStatGroup(baseData);
    const salesGridData = generalStatsTiles(statSelector,baseStatSelector);
    const loyaltyGridData = loyaltyStatsTileData(statSelector,baseStatSelector);
    const exceptionGridData = exceptionStatsTileData(statSelector,baseStatSelector);
    const transactionGridData = transactionStatsTileData(statSelector,baseStatSelector);
    const couponListData = couponListItemsData(currentData?.coupon,baseData?.coupon);
    const taxListData = taxListItemsData(currentData?.tax,baseData?.tax);
    const markdowns = markDownStatsData(currentData?.markdown,baseData?.markdown);

    

    const viewData = {
      salesData: salesGridData,
      exceptionData: exceptionGridData,
      loyaltyData: loyaltyGridData,
      couponData: couponListData,
      taxData: taxListData,
      transactionData: transactionGridData,
      markdownData: markdowns,
      weekData: weekData
    }

    return viewData;

  } catch (error) {
    console.error(`[ERROR] [viewDataAdapter] [viewAdapter] - ${error.message}`);
  }
}

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



const generalStatsTiles = (statSelector,baseStateSelector) => {
  const totalSalesStat = statSelector("sales","totalSales");
  const baseTotalSalesStat = baseStateSelector("sales","totalSales");
  const costOfGoodsSoldStat = statSelector("sales","costOfGoodsSold");
  const baseCostOfGoodsSoldStat = baseStateSelector("sales","costOfGoodsSold");

  const totalSalesTile = {
    title: "Revenue",
    format: "shortCurrency",
    property: "total",
    value: totalSalesStat.total,
    delta: Calculate.percentChange(baseTotalSalesStat.total,totalSalesStat.total)
  }

  const costOfGoodsSoldTile = {
    title: "COG Sold",
    format: "shortCurrency",
    property: "total",
    value: costOfGoodsSoldStat.total,
    delta: Calculate.percentChange(baseCostOfGoodsSoldStat.total,costOfGoodsSoldStat.total)
  }

  const averageBasketTile = {
    title: "Avg Basket",
    format: "currency",
    property: "total",
    value: totalSalesStat.total / totalSalesStat.quantity,
    delta: Calculate.percentChange(baseTotalSalesStat.total / baseTotalSalesStat.quantity,totalSalesStat.total / totalSalesStat.quantity)
  }

  const marginTile = {
    title: "Margin",
    format: "percentage",
    property: "total",
    value: Calculate.margin(totalSalesStat.total,costOfGoodsSoldStat.total),
    delta: Calculate.percentChange(Calculate.margin(baseTotalSalesStat.total,baseCostOfGoodsSoldStat.total),Calculate.margin(totalSalesStat.total,costOfGoodsSoldStat.total))
  }

  return [totalSalesTile,costOfGoodsSoldTile,averageBasketTile,marginTile]
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

    return [
      {
        title: "Customers",
        format: "shortCurrency",
        property: "total",
        value: customerStat.total,
        delta: Calculate.percentChange(baseCustomerStat.total,customerStat.total)
      },
      {
        title: "Items",
        format: "shortNumber",
        property: "quantity",
        value: itemStat.total,
        delta: Calculate.percentChange(baseItemStat.total,itemStat.total)
      },
      {
        title: "Points Given",
        format: "shortNumber",
        property: "quantity",
        value: pointsGivenStat.quantity,
        delta: Calculate.percentChange(basePointsGivenStat.quantity,pointsGivenStat.quantity)
      },
      {
        title: "Points Redeemed",
        format: "shortNumber",
        property: "quantity",
        value: pointsRedeemedStat.quantity,
        delta: Calculate.percentChange(basepointsRedeemedStat.quantity,pointsRedeemedStat.quantity)
      },
    ]
  } catch (error) {
    
  }
}

const couponListItemsData = (currentData,baseData) => {
  try {
    if (!currentData) return [];
    
    return currentData.map(data => {
      return {
        title: data.description,
        format: "shortCurrency",
        value: data.total,
        quantity: data.quantity,
        delta: data.total
      }
    })
  } catch (error) {
    
  }
}

const taxListItemsData = (currentData,baseData) => {
  try {
     if (!currentData) return [];
    return currentData.map(data => {
      return {
        title: data.description,
        format: "shortCurrency",
        value: data.total,
        quantity: data.quantity,
        delta: data.total
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

    return [
      {
        title: "Cancel Prev Item",
        format: "shortNumber",
        value: cancelPrevItemStat.quantity,
        delta: Calculate.percentChange(baseCancelPrevItemStat.quantity,cancelPrevItemStat.quantity)
      },
      {
        title: "Refunds",
        format: "shortNumber",        
        value: refundsStat.quantity,
        delta: Calculate.percentChange(baseRefundsStat.quantity,refundsStat.quantity)
      },
      {
        title: "No Sales",
        format: "shortNumber",
        value: noSalesStat.quantity,
        delta: Calculate.percentChange(baseNoSalesStat.quantity,noSalesStat.quantity)
      },
      {
        title: "Canceled Orders",
        format: "shortNumber",
        value: cancelOrderStat.quantity,
        delta: Calculate.percentChange(baseCancelOrderStat.quantity,cancelOrderStat.quantity)
      }
    ]
  } catch (error) {
    
  }
}

const transactionStatsTileData = (statSelector,baseStatSelector) => {
  try {
    if (!statSelector || !baseStatSelector) throw new Error("expected parameter of function, receieved undefined");
    const transactionCountStat = statSelector("transaction","customers");
    const baseTransactionCountStat = baseStatSelector("transaction","customers");
    const itemsStat = statSelector("transaction","items");
    const baseItemsStat = baseStatSelector("transaction","items");


    return [
      {
        title: "Count",
        format: "shortNumber",
        value: transactionCountStat.quantity,
        delta: Calculate.percentChange(baseTransactionCountStat.quantity,transactionCountStat.quantity)
      },
      {
        title: "Items",
        format: "shortNumber",
        value: itemsStat.quantity,
        delta: Calculate.percentChange(baseItemsStat.quantity,itemsStat.quantity)
      },
    ]
  } catch (error) {
    
  }
}


export const viewAdapter = (currentData,baseData) => {
  try {
    debugger;
    // if (!Array.isArray(currentData) || !Array.isArray(baseData)) throw new TypeError("parameter not of type array");
    const statSelector = selectStatGroup(currentData);
    const baseStatSelector = selectStatGroup(baseData);
    const salesGridData = generalStatsTiles(statSelector,baseStatSelector);
    const loyaltyGridData = loyaltyStatsTileData(statSelector,baseStatSelector);
    const exceptionGridData = exceptionStatsTileData(statSelector,baseStatSelector);
    const transactionGridData = transactionStatsTileData(statSelector,baseStatSelector);
    const couponListData = couponListItemsData(currentData?.coupon,baseData?.coupon);
    const taxListData = taxListItemsData(currentData?.tax,baseData?.tax);

    const viewData = {
      sales: salesGridData,
      exceptions: exceptionGridData,
      loyalty: loyaltyGridData,
      coupon: couponListData,
      tax: taxListData,
      transaction: transactionGridData
    }

    return viewData;

  } catch (error) {
    
  }
}
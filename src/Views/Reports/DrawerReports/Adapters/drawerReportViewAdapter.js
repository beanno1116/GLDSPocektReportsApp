import Sort from "../../../../Utils/Sort";

const calculateSafeStartTotal = () => {
  
}

const drawerReportViewDataAdapter = (data) => {
  try {
    if (!Array.isArray(data)) throw new Error("Data is not of type array");
    debugger;
    const currentData = data[0];
    const baseData = data[1];
    const currentPickups = currentData?.pickup || [];
    const currentInDrawer = currentData?.drawer || [];
    const currentExpected = currentData?.expected || [];
    const currentRevenue = currentData?.revenue || [];
    const currentOverShort = currentData?.overshort || [];

    const tendered = currentData?.tendered || [];

    const tenderSafeDetails = tendered.map(tender => {
      const tenderPickup = currentPickups.filter(pickup => pickup.lookup === tender.lookup)[0];
      const tenderInDrawer = currentInDrawer.filter(deposit => deposit.lookup === tender.lookup)[0];
      const tenderExpected = currentExpected.filter(loan => loan.lookup === tender.lookup)[0];
      const tenderOverShort = currentOverShort.filter(so => so.lookup === tender.lookup)[0];
      const tenderRevenue = currentRevenue.filter(so => so.lookup === tender.lookup)[0];

      return {
        description: tender.description,
        start: 0.00,
        revenue: tenderRevenue?.total || 0.00,
        pickup: tenderPickup?.total || 0.00,
        inDrawer: tenderInDrawer?.total || 0.00,
        expected: tenderExpected?.total || 0.00,
        overShort: tenderOverShort?.total || 0.00,
        format: "currency"
      }
    })

    const topTender = Sort.bySales(currentRevenue)[0];

    
    const expectedTotal = currentExpected.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00)


    const pickupTotal = currentPickups.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const depositTotal = currentExpected.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const inDrawerTotal = currentInDrawer.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);
    
    // const loanTotal = currentLoans.reduce((acc,cur) => {
    //   return acc + cur.total;
    // },0.00);
    
    const revenueTotal = currentRevenue.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const shortOverTotal = currentOverShort.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    

    console.log(expectedTotal);
    return {
      expectedTotal,
      depositTotal,
      inDrawerTotal,
      // loanTotal,
      pickupTotal,
      revenueTotal,
      shortOverTotal,
      tenderSafeDetails,
      topTender
    }

  } catch (error) {
    
  }
}

export default drawerReportViewDataAdapter;

const calculateSafeStartTotal = () => {
  
}

const safeReportViewDataAdapter = (data) => {
  try {
    if (!Array.isArray(data)) throw new Error("Data is not of type array");
    ;
    const currentData = data[0];
    const baseData = data[1];
    const currentPickups = currentData.pickup || [];
    const currentDeposits = currentData.safedeposit || [];
    const currentExpected = currentData?.safeexpected || [];
    const currentReceived = [];
    // const currentReceived = currentData.received || [];
    const currentLoans = currentData?.loan || [];
    const currentEnding = currentData?.safeending || [];
    const currentShortOver = currentData?.safeovershort || [];
    const tendered = currentData?.tendered || [];

    const tenderSafeDetails = tendered.map(tender => {
      const tenderPickup = currentPickups.filter(pickup => pickup.lookup === tender.lookup)[0];
      const tenderDeposit = currentDeposits.filter(deposit => deposit.lookup === tender.lookup)[0];
      const tenderLoan = currentLoans.filter(loan => loan.lookup === tender.lookup)[0];
      const tenderOverShort = currentShortOver.filter(so => so.lookup === tender.lookup)[0];

      return {
        description: tender.description,
        pickup: tenderPickup?.total || 0.00,
        deposit: tenderDeposit?.total || 0.00,
        loan: tenderLoan?.total || 0.00,
        overShort: tenderOverShort?.total || 0.00,
        format: "currency"
      }
    })

    
    const expectedTotal = currentExpected.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00)


    const pickupTotal = currentPickups.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const depositTotal = currentDeposits.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const receivedTotal = currentReceived.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);
    
    const loanTotal = currentLoans.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);
    
    const endingTotal = currentEnding.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    const shortOverTotal = currentShortOver.reduce((acc,cur) => {
      return acc + cur.total;
    },0.00);

    

    console.log(expectedTotal);
    return {
      shortOver: currentShortOver,
      ending: currentEnding,
      expectedTotal,
      pickupTotal,
      depositTotal,
      receivedTotal,
      loanTotal,
      endingTotal,
      shortOverTotal,
      tenderSafeDetails
    }

  } catch (error) {
    
  }
}

export default safeReportViewDataAdapter;
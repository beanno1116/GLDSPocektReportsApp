

const safeReportViewDataAdapter = (data) => {
  try {
    if (!Array.isArray(data)) throw new Error("Data is not of type array");
    const currentData = data[0];
    const baseData = data[1];

    const currentPickups = currentData.pickup;
    const currentDeposits = currentData.safedeposit;
    const currentExpected = currentData?.safeexpected || [];
    const currentReceived = currentData.received;
    const currentLoans = currentData?.loan || [];
    const currentEnding = currentData?.safeending || [];

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

    

    console.log(expectedTotal);

    return {
      expectedTotal,
      pickupTotal,
      depositTotal,
      receivedTotal,
      loanTotal,
      endingTotal
    }

  } catch (error) {
    
  }
}

export default safeReportViewDataAdapter;
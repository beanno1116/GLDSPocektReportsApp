

class SafeDescriptors {
  loan = 1000;

}

const safeDescriptorsMap = new Map({

})



class LocReportAdapter {

  
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
}

export default LocReportAdapter;
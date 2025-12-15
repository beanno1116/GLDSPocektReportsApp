

class MutateObj {
  #fraudWatchNames;

  constructor(){
    this.#fraudWatchNames = {
    "CancelPrevCount": "Cancel Prev",
    "CanceledOrders": "Cancel Order",
    "Nosale": "No Sale",
    "RefundLineCount": "Refund"
}
  }

  thisWeekVsLastWeekData(data){
    try {
      if (!data) return [];
      const tempObj = new Map();
      data.forEach(record => {
        if (record.WeekType.toLowerCase() === "current"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),thisWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,thisWeekSales:record.SalesAmount});            
          }          
        }
        if (record.WeekType.toLowerCase() === "prior"){
          let day = record.DayName.substring(0,3);
          if (tempObj.has(day)){
            tempObj.set(day,{...tempObj.get(day),lastWeekSales:record.SalesAmount});
          }else{
            tempObj.set(day,{name:day,lastWeekSales:record.SalesAmount});            
          }         
        }
      });
      
      let dataArray = [];
      for (const [key,value] of tempObj){
        dataArray.push(value);
      }
      return dataArray;
    } catch (error) {
      console.error(error.message);
    }
  }

  fraudWatchData(data){
    try {      
      if (!data) return [];

      let fraudWatchData = [];
      data.forEach(rd => {
        let fraudCategory = rd[0];
        let props = Object.keys(fraudCategory)[0];
        let name = this.#fraudWatchNames[props];
        let total = fraudCategory[props];
        let obj = {
          name,
          total
        }
        fraudWatchData = [...fraudWatchData,obj]
      })      
      return fraudWatchData;      
    } catch (error) {
      console.error(error.message);
    }
  }

  basketDetailsData(data){
    try {      
      if (!data) return [];
      const detailDataArr = []
      data.forEach(record => {
        let name = record.DayName.substring(0,3);
        let totalSales = parseFloat(record.TotalSales).toFixed(2);
        let totalItems = record.TotalItems;
        const dataObj = {
          name,
          totalSales,
          totalItems
        }
        detailDataArr.push(dataObj);
      });
      
      
      return detailDataArr;
    } catch (error) {
      console.error(error.message);
    }
  }

  safeDetailsData(data){
    const dataArr = [];
    const reportMap = new Map();  

    const dataSchema = {
      PickUp: {},
      Loan: {},
      Expected: {},
      SafeDeposit: {},
      Received: {},
      ShortOver: {}
    }

    debugger;  
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
    debugger;
    return reportMap;
  }

}

const Mutate = new MutateObj();

export default Mutate;
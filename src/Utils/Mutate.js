

class MutateObj {

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

}

const Mutate = new MutateObj();

export default Mutate;
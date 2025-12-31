import { calculatePercentChange } from "../Utils/Utils";

const exceptionNameMappings = {
  "cancelprev.item": "Cancel prev item",
  "cancelorder": "Canceled orders",
  "refundkeyinfo": "Refunds",
  "taxexempt1": "Tax 1 Exemptions"
}



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

  parseHomeViewData(data){
    try {
      if (!Array.isArray(data)) throw new TypeError("parameter not of type array");
      
      const todayStats = data[0];
      const prevStats = data[1];
      const todayDepts = data[2];
      const prevDepts = data[3];
      
      const homeViewData = {
        stats: [
          {
            title: "Revenue",
            format: "shortCurrency",
            value: todayStats.totalSales.total,
            delta: calculatePercentChange((prevStats.totalSales.total,todayStats.totalSales.total))
          },
          {
            title: "Transactions",
            format: "shortNumber",
            value: todayStats.totalSales.quantity,
            delta: calculatePercentChange(prevStats.totalSales.quantity,todayStats.totalSales.quantity)
          },
          {
            title: "Avg Basket",
            format: "currency",
            value: todayStats.totalSales.total / todayStats.totalSales.quantity,
            delta: calculatePercentChange(prevStats.totalSales.total / prevStats.totalSales.quantity,todayStats.totalSales.total / todayStats.totalSales.quantity)
          },
          {
            title: "Margin",
            format: "percentage",
            value: "28.4%",
            delta: "↓ 1.2%"
          }
        ],
        exceptions: todayStats.exceptions.map(exception => {          
          return {
            title: exceptionNameMappings[exception.description.toLowerCase().replace(/ /g, '')],
            format: "shortNumber",
            value: exception.total,
            delta: "↓ 1.2%"
          }
        })        
      }


      const departmentArray = [];

      todayDepts.forEach((department,index) => {
        const {description,quantity,total,weight} = department;
        const prevDept = prevDepts[index];
        let arrObj = {
          description: description,
          quantity: quantity,
          prevQuantity: prevDept.quantity,
          quantityDelta: calculatePercentChange(prevDept.quantity,quantity),
          total: department.total,
          prevTotal: prevDept.total,
          totalDelta: calculatePercentChange(prevDept.total,total),
          weight: weight,
          prevWeight: prevDept.weight,
          weightDelta: weight,
        }
        departmentArray.push(arrObj);
      });

      homeViewData.departments = departmentArray;

      return homeViewData;

    } catch (error) {
      
    }
  }

}

const LocDataAdapter = new LocReportAdapter();

export default LocDataAdapter;
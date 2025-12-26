
const statGroupMap = new Map();

const salesGroups = {
  nrgt: "sales",
  sales: "sales",
  globaldiscount: "discounts",
  taxes: "taxes",
  plus: "plus",
  received: "received",
  itemdiscount: "discounts",
  information: "information",
  markdowns: "markdowns",
  poschecks: "backups",
  exceptions: "exceptions",
  statistics: "transaction",
  loyalty: "loyalty",
  buying: "purchasing",
  inventory: "inventory"
}

const statGroups = {
  sales: [
    "total sales",
    "hash_sales",
    "grand-ttl net",
    "grand-ttl training",
    "net sales",
    "bottle sales pop",
    "bottle sales beer", 
    "sales non taxable",
    "sales during sale period",
    "sales during tpr period",
    "sales keyed"
  ],
  fees: [
    "freight weight"
  ],
  coupons: [
    "coupon able",
    "electronic vendor coupon",
    "store coupon",
    "elec. store coupon",

  ],
  tax: [
    "tax 1",
    "taxable 1"
  ],
  giftCards: [
    "gift certificate sold"
  ],
  charity: [
    "charity"
  ],
  discounts: [
    "discountable sales",
    "sub-department discount",
    "discounts"
  ],
  foodstamps: [
    "food stampable"
  ],
  wic: [
    "wicable"
  ],
  markdowns: [
    "temporary markdown"
  ],
  backup: [
    "pos transaction backup",
    "pos transaction restore",
    "pos suspended balance",
  ],
  exceptions: [
    "cancel last item",
    "cancel prev. item",
    "correct. tender",
    "corrections",
    "refund key info",
    "tax refund 1",
    "no sales"
  ],
  customer: [
    "customers",
    "customers with id",
    "items with id",
  ],
  items: [
    "items",
    "items scanned"
  ],
  transaction: [
    "time complete trans",
    "time on sub-total",
    "time on sale",
    "time idle"
  ],
  purchasing: [
    "deposit buying",
    "allowances bill back sales",
    "admissible spending",
    "gross purchase",
    "purchase retail value",
    "total purchased",
    "cost of goods"
  ]
}

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

  /*
    [
      {
          "name": "Sun",
          "thisWeekSales": 57027.62,
          "lastWeekSales": 43767.74
      },
      {
          "name": "Mon",
          "thisWeekSales": 77767.04,
          "lastWeekSales": 44735.72
      },
      {
          "name": "Tue",
          "thisWeekSales": 110399.73,
          "lastWeekSales": 44521.24
      },
      {
          "name": "Wed",
          "thisWeekSales": 0,
          "lastWeekSales": 43557.11
      },
      {
          "name": "Thu",
          "thisWeekSales": 0,
          "lastWeekSales": 46542.75
      },
      {
          "name": "Fri",
          "thisWeekSales": 0,
          "lastWeekSales": 43212.67
      },
      {
          "name": "Sat",
          "thisWeekSales": 0,
          "lastWeekSales": 52250.66
      }
    ]
  */
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
      debugger;
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
    try {
      if (!Array.isArray(data)) throw new TypeError("data not of type array");

      const filterArray = [
        "indrawer",
        "over/short",
        "safe expected",
        "safe ending",
        "expected"
      ]

      const safeDetailMap = new Map();

      const totals = {
        safeStart: 0.00,
        pickup: 0.00,
        loan: 0.00,
        received: 0.00,
        deposit: 0.00,
        shortOver: 0.00,
        safeEnd: 0.00
      }

      data.forEach(row => {
        const {media:tender,totalizer,description,total} = row;
        
        if (filterArray.includes(description.toLowerCase())) return;      

        if (safeDetailMap.has(tender)){

          const mediaMapObj = safeDetailMap.get(tender);

          if (totalizer === 20){
            totals.safeEnd = totals.safeEnd + parseFloat(row.total);
            mediaMapObj.subTitle = row.total;
            safeDetailMap.set(tender,mediaMapObj);
            return;
          }

          if (description.toLowerCase() === "loan"){
            totals.loan = totals.loan + parseFloat(row.total);            
          }

          if (description.toLowerCase() === "safe over/short"){
            totals.shortOver = totals.shortOver + parseFloat(row.total);            
          }
          if (description.toLowerCase() === "pick up"){
            totals.pickup = totals.pickup + parseFloat(row.total);            
          }
          if (description.toLowerCase() === "safe deposit"){
            totals.deposit = totals.deposit + parseFloat(row.total);
          }

          let safeDetailRow = {
            title: description,
            value: total
          }

          safeDetailMap.set(tender,{...mediaMapObj,details:[...mediaMapObj.details,safeDetailRow]});
        }else{

          if (totalizer === 20){
            let detailObj = {
              title: tender,
              subTitle: total,
              details: []
            }
            totals.safeEnd = totals.safeEnd + parseFloat(row.total);
            safeDetailMap.set(tender,detailObj);
            return;
          }
          if (description.toLowerCase() === "loan"){
            totals.loan = totals.loan + parseFloat(row.total);            
          }

          if (description.toLowerCase() === "safe over/short"){
            totals.shortOver = totals.shortOver + parseFloat(row.total);            
          }
          if (description.toLowerCase() === "pick up"){
            totals.pickup = totals.pickup + parseFloat(row.total);            
          }
          if (description.toLowerCase() === "safe deposit"){
            totals.deposit = totals.deposit + parseFloat(row.total);
          }

          let detailObj = {
            title: tender,
            subTitle: "",
            details: [
              {
                title: description,
                value: total
              }
            ]
          }
          safeDetailMap.set(tender,detailObj);
        }

      })
      
      
      let dataArray = [];
      for (const [key,value] of safeDetailMap){
        dataArray.push(value);
      }    
    
      
      return {
        totals: totals,
        rows: dataArray
      }
    } catch (error) {
      
    }
  }

  storeStatsData(data){
    try {
      // 
      if (!Array.isArray(data)) throw new TypeError("data not of type array");

      const stateGroupMap = new Map();

      data.forEach(row => {
        let description = row.description;
        let quantity = row.quantity;
        let group = row.group;
        let weight = row.weight;
        let total = row.total;

        if (description.toLowerCase() === "total sales"){
          stateGroupMap.set("totalSales",row);
        }

        let tempStatGroup = salesGroups[group.toLowerCase().replace(" ","")]; 
        let statGroup = salesGroups[group.toLowerCase().replace(" ","")];
        
        if (stateGroupMap.has(statGroup)){
          let groupItems = stateGroupMap.get(statGroup);
          const rowObj = {
            description,
            group: statGroup,
            quantity,
            weight,
            total
          }          
          stateGroupMap.set(statGroup,[...groupItems,rowObj]);
        }else {          
          const rowObj = {
            description,
            group: statGroup,
            quantity,
            weight,
            total
          }          
          stateGroupMap.set(statGroup,[rowObj]);
        }

      });

      
      
      return Object.fromEntries(stateGroupMap);
      
    } catch (error) {
      console.error(error.message);
    }
  }

}

const Mutate = new MutateObj();

export default Mutate;
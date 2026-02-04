
class SortUtility {

  hourlySales(sales,direction){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");
      const sortedSales = sales.sort((a,b) => {
        
        if (a.total < b.total){
          return 1;
        }
        if (a.total > b.total){
          return -1;
        }
        return 0;
      })
      return sortedSales;
    } catch (error) {
      
    }
  }

  hourlyQuantity(sales,direction){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");
      const sortedSales = sales.sort((a,b) => {
        
        if (a.quantity < b.quantity){
          return 1;
        }
        if (a.quantity > b.quantity){
          return -1;
        }
        return 0;
      })
      return sortedSales;
    } catch (error) {
      
    }
  }

  byHour(sales,direction="asc"){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");

      const sortedSales = sales.sort((a,b) => {
        
        if (parseInt(a.hour) < parseInt(b.hour)){
          if (direction === "asc"){
            return -1;
          }
          return 1;
        }
        if (parseInt(a.hour) > parseInt(b.hour)){
          if (direction === "asc"){
            return 1;
          }
          return -1;
        }
        return 0;
      })
      return sortedSales;
    } catch (error) {
      
    }
  }

  byHourlyBasket(sales,direction="asc"){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");

      const sortedSales = sales.sort((a,b) => {
        const aBasket = a.total / a.quantity;
        const bBasket = b.total / b.quantity;
        // debugger;
        if (aBasket < bBasket){
          if (direction === "asc"){
            return -1;
          }
          return 1;
        }
        if (aBasket > bBasket){
          if (direction === "asc"){
            return 1;
          }
          return -1;
        }
        return 0;
      })
      return sortedSales;
    } catch (error) {
      console.error(error.message);
    }
  }
  bySales(sales,direction="desc"){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");
      const sortedSales = sales.sort((a,b) => {
        
        if (a.total < b.total){
          if (direction === "asc"){
            return -1;
          }
          return 1;
        }
        if (a.total > b.total){
          if (direction === "asc"){
            return 1;
          }
          return -1;
        }
        return 0;
      })
      return sortedSales;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const Sort = new SortUtility();

export default Sort;
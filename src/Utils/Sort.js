
class SortUtility {

  hourlySales(sales,direction){
    try {
      if (!Array.isArray(sales)) throw new TypeError("parameter sales not of type array");
      const sortedSales = sales.sort((a,b) => {
        debugger;
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

}

const Sort = new SortUtility();

export default Sort;
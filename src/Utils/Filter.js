

class FilterObj {

  storeById(stores,storeId){
    try {
      return stores.filter(s => parseInt(s.id) === parseInt(storeId))[0];  
    } catch (error) {
      console.error(error.message);
    }
  }

  userById(users,userId){
    try {
      return users.filter(u => u.id === userId)[0];  
    } catch (error) {
      console.error(error.message);
    }
  }

  makeUnique(arr){
    try {
      if (!Array.isArray(arr)) throw new TypeError(`[Filter] [makeUnique] [ERROR] parameter arr not of type array`);
      const uniqueArray = [...new Set(arr)];
      return uniqueArray;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const Filter = new FilterObj();

export default Filter;

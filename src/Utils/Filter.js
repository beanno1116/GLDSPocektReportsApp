

const STALE_LIMIT = 300000;


class Cache {
  #cache;

  constructor(){
    this.#cache = new Map();
  }


  #checkCache(key,cachedKey){
    try {
      if (!this.#cache.has(key)) return false;
      const filterCache = this.#cache.get(key);
      if (filterCache.has(cachedKey)){
        const cachedObj = filterCache.get(cachedKey);
        const cachedTime = new Date(cachedObj.timestamp);
        const currentTime = new Date();
        const timeDiff = currentTime - cachedTime;
        if (timeDiff >= STALE_LIMIT){
          return false;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(`[FilterObj] [#checkCache] [ERROR] - ${error.message}`);
    }
  }



}


class FilterObj {

  #filtersCache;

  constructor(){
    this.#filtersCache = new Map();
  }

  #checkCache(key,cachedKey){
    try {      
      if (!this.#filtersCache.has(key)) return false;
      const filterCache = this.#filtersCache.get(key);
      if (filterCache.has(cachedKey)){
        const cachedObj = filterCache.get(cachedKey);
        const cachedTime = new Date(cachedObj.timestamp);
        const currentTime = new Date();
        const timeDiff = currentTime - cachedTime;
        if (timeDiff >= STALE_LIMIT){
          return false;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(`[FilterObj] [#checkCache] [ERROR] - ${error.message}`);
    }
  }

  #getFilterCache(key,cacheKey){
    
    try {
      if (!this.#checkCache(key,cacheKey)) throw new Error(`No cache with key ${key} or cacheKey ${cacheKey} exists`);
      return this.#filtersCache.get(key).get(cacheKey);      
    } catch (error) {
      console.error(`[FilterObj] [#getFilterCache] [ERROR] - ${error.message}`);
    }
  }

  #updateFilterCache(key,cacheKey,value){
    
    try {
      const dt = new Date();
      const filterObj = {
        data: value,
        timestamp: dt.toString()
      }
      if (this.#checkCache(key,cacheKey)){
        const filterCache = this.#getFilterCache(key,cacheKey);
        this.#filtersCache.set(key,filterCache.set(cacheKey,JSON.stringify(filterObj)));
        return;
      }
      const newCache = new Map(cacheKey,filterObj);
      this.#filtersCache.set(key,JSON.stringify(newCache));
    } catch (error) {
      console.error(`[FilterObj] [#updateFilterCache] [ERROR] - ${error.message}`);
    }
  }

  storeById(stores,storeId){
    try {
      // const methodName = this.storeById.name;
      // if (this.#checkCache(methodName,storeId)){
      //   return this.#getFilterCache(this.storeById.name,storeId).get(storeId).data;
      // }
      const filteredStore = stores.filter(s => parseInt(s.id) === parseInt(storeId))[0];
      // this.#updateFilterCache(methodName,storeId,filteredStore);
      return filteredStore;
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

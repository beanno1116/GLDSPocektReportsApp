


const useLocalStorage = () => {

  const setValue = (key,value="") => {
    try {
      if (!key) throw new Error("Cannot set value with out key");      
      localStorage.setItem(key,value);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getValue = (key) => {
    try {
      if (!key) throw new Error("Cannot get value with out a valid key");
      const value = localStorage.getItem(key);
      if (value){
        return value;
      }
      throw new Error("Value not found for key " + key);
    } catch (error) {
      console.error(error.message);
    }
  }

  return {
    get: getValue,
    set: setValue
  }
}

export default useLocalStorage;



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

  const updateValue = (key,value) => {
    try {
      if (localStorage.getItem(key)) {
        const currentValue = localStorage.getItem(key);
        const valueObj = JSON.parse(currentValue);
        if (typeof valueObj === "object"){
          const updatedObj = {...valueObj,...value};
          localStorage.setItem(key,JSON.stringify(updatedObj));
          return true;
        }
        localStorage.setItem(key,JSON.stringify(value));        
      }
      setValue(key,value);
      return true;
    } catch (error) {
      if (error.name === "SyntaxError"){
        console.error(`${key} property's value is invalid JSON value`);
      }
      return false;
    }
  }

  return {
    get: getValue,
    set: setValue,
    update: updateValue
  }
}

export default useLocalStorage;
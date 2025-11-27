import { useCallback, useRef, useState } from "react"

const uuid = (prefix) => {
  try {
    var text = prefix || "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";  
    for (var i = 0; i < 64; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }  
    return text;
  } catch (error) {
    console.error(`[FNC][UUID][ERROR] - ${error.message}`);
  }        
}

const validate = function(inputs){
  return {
    required(){
      let errorCount = 0;
      for (const input in inputs) {
        if (Object.prototype.hasOwnProperty.call(inputs, input)) {
          const inputEle = inputs[input];
          if (inputEle.input.value === "" || inputEle?.input.value === undefined || inputEle?.input.value === null){
            inputEle.input.dataset.error = true;
            errorCount++;
            continue;
          }
          inputEle.input.dataset.error = false;
        }
      }
      if (errorCount > 0){
        return false;
      }
      return true;
    },
    match(value1,value2){
      try {
        if (value1 === value2){
          return true;
        }
        inputs.password.dataset.error = true;
        inputs.confirmPassword.dataset.error = true;
        return false;
      } catch (error) {
        console.error(`[ERROR] [Validate] [match] - ${error.message}`);
      }
    }
  }
}

const useWEForm = (initialData) => {
  const [formData,setFormData] = useState(initialData);

  const inputsRef = useRef({});

  const inputRefCallback = useCallback((ele,options) => {    
    if (ele) {
      const name = ele.getAttribute("name");
      inputsRef.current = {...inputsRef.current,[name]:{input:ele,options:options}};
    }
  },[])

  const onChange = (e) => {
    try {
      
      let name = e.target.name;
      let value = e.target.value;
      inputsRef.current[name].input.dataset.error = false;
      
      setFormData({...formData,[name]:value})      
      
    } catch (error) {
      console.error(error.message);
    }
  }

  const onBlur = (e) => {
    try {         
      
      const name = e.target.name;
      

      
    } catch (error) {
      console.error(error.message);
    }
  }

  const resetForm = (e) => {
    e && e.preventDefault();
    try {
      setFormData(initialData);
      const inputsObj = inputsRef.current;
      for (const prop in inputsObj) {
        if (Object.prototype.hasOwnProperty.call(inputsObj, prop)) {
          const inputEle = inputsObj[prop];
          inputEle.input.dataset.error = false;
          
        }
      }
    } catch (error) {
      console.error(`[ERROR] [useWEForm] [resetForm] - ${error.message}`);
    }  
    
  } 

  const onSubmit = (e,handler) => {
    try {      
      e.preventDefault();
      e.stopPropagation();
      
      let inputsObj = inputsRef.current;
      let validator = validate(inputsObj);
      let isValid = true;

      for (const input in inputsObj) {
        if (Object.prototype.hasOwnProperty.call(inputsObj, input)) {
          const inputEle = inputsObj[input];
          if (inputEle?.options && inputEle.options?.required){
            isValid = validator.required();
          }
        }
      }
      
      
      handler && handler({data:formData,isValid:isValid});      
      
  
    } catch (error) {
      console.error(`[ERROR] [useWEForm] [onSubmit] - ${error.message}`);
    }
  }

  const registerFormInput = (name,options={}) => {

    const retObj = {
      id: uuid(),
      value: formData[name],
      name,      
      "data-error": "false",
      ref: (ele) => inputRefCallback(ele,options),
      onChange: onChange,
      onBlur: options?.onBlur ? options.onBlur : onBlur
    }
    
    return retObj;
  }

  return {
    formData,    
    onSubmit,
    resetForm,
    registerFormInput,    
  }
}

export default useWEForm;
import Format from "./Format";


export const removeFromArray = (arr,item) => {
  try {
    if (!Array.isArray(arr)) throw new TypeError(`[Utils] [removeFromArray] [ERROR] parameter arr not of type array`)
      
  } catch (error) {
    
  }
}

export const uuid = (prefix) => {
  var text = prefix || "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

  for (var i = 0; i < 64; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const handleZeroValue = (value) => {
  
  if (value === undefined || value === null) return "";
  if (value === "") return "0.00";

  if (parseFloat(value) === 0.00 || parseFloat(value) === 0) return Format.stringAsMoney(parseFloat(value));
  
  return Format.stringAsMoney(value);
}

export const take = function* (n,iterable){
  for (let item of iterable){
    if (n <= 0) return;
    n--;
    yield item;
  }
}
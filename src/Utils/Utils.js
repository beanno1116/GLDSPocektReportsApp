

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
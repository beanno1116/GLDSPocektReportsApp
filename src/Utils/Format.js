

class FormatUtil {

  padDateTimeElement(element){
    try {      
      if (!element) throw new Error("Cannot pad undefined or null date/time element");
      const elementAsString = element.toString();
      if (elementAsString.length > 2) return elementAsString;
      if (elementAsString.length === 2){
        return elementAsString;
      }

      return `0${elementAsString}`;

    } catch (error) {
     console.error(`[ERROR] [FormatUtil] [padDateTimeElement] - ${error.message}`);
    }
  }

  phoneNumber(phoneNumber){
    try {
      const cleanPhoneNumber = phoneNumber.replace("(","").replace(")","").replaceAll("-","");
      let strPosition = -1;
      let formatedPhoneNumber = "(";
      for (let i = 0; i < cleanPhoneNumber.length; i++) {
        strPosition++;
        const char = cleanPhoneNumber[i];
        if (i < 3){
          formatedPhoneNumber += char;
          continue;
        }
        if (i === 3){
          formatedPhoneNumber += ")"
          formatedPhoneNumber += char;
          continue;
        }
        if (i === 6){
          formatedPhoneNumber += "-";
          formatedPhoneNumber += char;
          continue;
        }
        formatedPhoneNumber += char;        
      }
      return formatedPhoneNumber;
    } catch (error) {
     console.error(`[ERROR] [FormUtil] [phoneNumber] - ${error.message}`);
    }
  }

  cleanPhoneNumber(phoneNumber){
    try {
      if (!phoneNumber) throw new Error("Cannot clean null or undefined phoneNumber parameter");
      return phoneNumber.replace("(","").replace(")","").replace("-","").replace("+","");
    } catch (error) {
     console.error(`[ERROR] [FormatUtil] [cleanPhoneNumber] - ${error.message}`);
    }
  }

  shortDate(date,seperator="/"){
    try {
      let dateTime = undefined;
      if (typeof date === "string"){
        dateTime = new Date(date);
        if (!dateTime) throw new TypeError("date parameter not a valid date string");
      }else{
        dateTime = date;
      }

      let month = this.padDateTimeElement(dateTime.getMonth() + 1);
      let day = this.padDateTimeElement(dateTime.getDate());
      let year = dateTime.getFullYear().toString().substring(2);

      return `${month}${seperator}${day}${seperator}${year}`;
    } catch (error) {
      console.error(error.message);
    } 
  }

  shortDateTime(date,seperator="/"){
    try {
      let dateTime = undefined;
      if (typeof date === "string"){
        dateTime = new Date(date);
        if (!dateTime) return;
      }else{
        dateTime = date;
      }

      let month = dateTime.getMonth() + 1;
      let day = dateTime.getDate();
      let year = dateTime.getFullYear().toString().substring(2);
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let period = (hour > 12) ? "PM" : "AM";
      return `${month}${seperator}${day}${seperator}${year} ${hour}:${minutes} ${period}`;
    } catch (error) {
      console.error(error.message);
    }
  }

  totalSalesShort(total){
    if (typeof total === "object") return "";    
    if (!total) return "";
    if (parseFloat(total) > 1000){
      return `$${total}K`;
    }
    return `$${parseInt(total)}`
  }

}

const Format = new FormatUtil();

export default Format;
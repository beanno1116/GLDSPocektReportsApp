

class FormatUtil {

  #isRealNumber(value){
    try {
      return typeof value === 'number' && Number.isFinite(value);
    } catch (error) {
      console.error(error.message);
    }
  }

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

  stringAsMoney(value,locale = "en-US") {
    try {
      return `${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } catch (error) {
      console.error(error.message);
    }
  }

  /*
    millions: >=7 1000000
    hundred thousands: >=6 100000
    ten thousands: >=5 10000
    thousands: >=4 1000
    hundreds: >=3 100
  */

  moneyAbbreviation(value){
    try {      
      
      if (this.#isRealNumber(parseFloat(value))){
        const valueAsInt = parseInt(value);
        const valueAsString = valueAsInt.toString();
        const valueLength = valueAsString.length;
        let displayNumber = valueAsString.substring(0,2).slice(0,1) + "." + valueAsString.substring(0,2).slice(1);
        if (valueLength >= 7){
          return `$${displayNumber}M`
        }
        if (valueLength >= 6 && valueLength < 7){
          return `$${valueAsString.substring(0,4).slice(0,3) + "." + valueAsString.substring(0,4).slice(3)}K`;
        }
        if (valueLength >= 5 && valueLength < 6){
          return `$${valueAsString.substring(0,3).slice(0,2) + "." + valueAsString.substring(0,3).slice(2)}K`;
        }
        if (valueLength >= 4 && valueLength < 5){
          return `${valueAsString.substring(0,2).slice(0,1) + "." + valueAsString.substring(0,2).slice(1)}K`;
        }
        if (valueLength <= 3){
          return `$${valueAsString}`
        }
        if (valueLength < 6 && valueLength > 3){
          return `$${displayNumber}K`
        }
        return `$${displayNumber}`;
      }
    } catch (error) {
      
    }
  }

}

const Format = new FormatUtil();

export default Format;
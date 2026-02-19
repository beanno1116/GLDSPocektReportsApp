import { form } from "motion/react-client";


class FormatUtil {

  CURRENCY_FORMAT = "currency";
  NUMBER_FORMAT = "number";
  PERCENTAGE_FORMAT = "percentage";
  SHORT_CURRENCY_FORMAT = "shortCurrency";
  SHORT_MINUTE_FORMAT = "shortMinute";
  SHORT_NUMBER_FORMAT = "shortNumber";
  INTEGER_FORMAT = "intFormat";
  DECIMAL_FORMAT = "floatFormat";


  #isRealNumber(value){
    try {
      return typeof value === 'number' && Number.isFinite(value);
    } catch (error) {
      console.error(error.message);
    }
  }
  #isInstanceOfDate(value){
     try {
      if (!value) throw new Error("paramet value is null or undefined");
      return (Object.prototype.toString.call(value) === "[object Date]") && !isNaN(value);
    } catch (error) {
      console.error(error.message);
    }
  }
  #dateElementsAsObject(date,padElements=true){
    return {
      month: this.padDateTimeElement(date.getMonth() + 1),
      day: this.padDateTimeElement(date.getDate()),
      year: date.getFullYear(),
      hour: this.padDateTimeElement(date.getHours()),
      minutes: this.padDateTimeElement(date.getMinutes()),
      period: (date.getHours() > 12) ? "PM" : "AM"
    }
  }

  padDateTimeElement(element){
    try {      
      if (!element) return element;
      // if (!element) throw new Error("Cannot pad undefined or null date/time element");
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

  asLongDate(date=new Date(),locale="en-US"){
    try {
      
      const dateCopy = new Date(date);
      const formattedDateString = dateCopy.toLocaleDateString(locale,{
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      return formattedDateString;
    } catch (error) {
      console.error(error.message);
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
      if (parseFloat(value) < 0){
        return `${parseFloat(value * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; 
      }
      return `${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } catch (error) {
      console.error(error.message);
    }
  }

  stringAsNumber(value,locale="en-US"){
    try {
      return `${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } catch (error) {
      console.error(error.message);
    }
  }

  asNumber(value,locale="en-US"){
    try {
      return value.toLocaleString(locale);
    } catch (error) {
      console.error(`[ERROR] [Format] [asNumber] - ${error.message}`);
    }
  }

  stringAsInteger(value){
    try {
      if (this.#isRealNumber(parseFloat(value))) {
        return `${parseFloat(this.asNumber(value)).toFixed(0)}`;
      }
    } catch (error) {
      
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
        if (valueLength === 8){
         return `${valueAsString.substring(0,3).slice(0,2) + "." + valueAsString.substring(0,3).slice(2)}M`;
        }
        if (valueLength >= 6 && valueLength < 7){
          return `${valueAsString.substring(0,4).slice(0,3) + "." + valueAsString.substring(0,4).slice(3)}K`;
        }
        if (valueLength >= 5 && valueLength < 6){
          return `${valueAsString.substring(0,3).slice(0,2) + "." + valueAsString.substring(0,3).slice(2)}K`;
        }
        if (valueLength >= 4 && valueLength < 5){
          return `${valueAsString.substring(0,2).slice(0,1) + "." + valueAsString.substring(0,2).slice(1)}K`;
        }
        if (valueLength <= 3){
          return `${parseFloat(value).toFixed(2)}`
        }
        if (valueLength < 6 && valueLength > 3){
          return `$${displayNumber}K`
        }
        return `${displayNumber}`;
      }
    } catch (error) {
      
    }
  }

  toRequestDateFormat(date=new Date()){
    try {

      if (!date) return "";
      if (!this.#isInstanceOfDate(date)) throw TypeError("date parameter not a valid Date() obj");

      const dateObj = this.#dateElementsAsObject(date);

      const {month,day,year} = dateObj;

      return `${month}/${day}/${year}`;

    } catch (error) {
      console.error(error.message);
    }
  }

  toCamelCase(string=""){
    try {
      if (string === "") return string;
      const lowerCaseString = string.replace(/[\/,._\-;'""]/g, ' ').toLowerCase();
      const stringArray = lowerCaseString.split(" ");
      let camelString = "";
      if (stringArray.length > 0){
        stringArray.forEach((str,index) => {
          if (index === 0){
            camelString += str;
            return;
          }
          camelString += str.charAt(0).toUpperCase() + str.slice(1)
        })
      }
      return camelString;
    } catch (error) {
      console.error(error.message);
      return "";
    }
  }

  toCapitalized(string=""){
    try {
      if (string === "") return string;   
      const lowerCaseString = string.toLowerCase();
      return lowerCaseString.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    } catch (error) {
      console.error(error.message);
      return "";
    }
  }

  string(value,format){
    switch (format) {
      case this.CURRENCY_FORMAT:
        return `${value < 0 ? "-" : ""}$${this.stringAsMoney(value)}`;
      case this.INTEGER_FORMAT:
        return this.stringAsInteger(value);
      case this.NUMBER_FORMAT:
        return this.asNumber(value);
      case this.SHORT_NUMBER_FORMAT:
        return this.moneyAbbreviation(value);
      case this.SHORT_CURRENCY_FORMAT:
        return `$${this.moneyAbbreviation(value)}`;
      case this.PERCENTAGE_FORMAT:
        return `${parseInt(value)}%`
      case this.SHORT_MINUTE_FORMAT:
        return `${value} min`
      default:
        return value;
    }

  }
}

const Format = new FormatUtil();

export default Format;
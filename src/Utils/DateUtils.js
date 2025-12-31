

class DateUtils {

  #isInstanceOfDate(value){
    try {
      if (!value) throw new Error("paramet value is null or undefined");
      return (Object.prototype.toString.call(value) === "[object Date]") && !isNaN(value);
    } catch (error) {
      console.error(error.message);
    }
  }
  #dateElementsAsObject(date,padElements){
    return {
      month: this.padDateTimeElement(dateTime.getMonth() + 1),
      day: this.padDateTimeElement(dateTime.getDate()),
      year: dateTime.getFullYear(),
      hour: this.padDateTimeElement(dateTime.getHours()),
      minutes: this.padDateTimeElement(dateTime.getMinutes()),
      period: (hour > 12) ? "PM" : "AM"
    }
  }

  setDateBack(date,days=1){
    try {      
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");

      date.setDate(date.getDate() - days);
      
      return date;
    } catch (error) {
      
    }
  }

}

const DateUtility = new DateUtils();

export default DateUtility;
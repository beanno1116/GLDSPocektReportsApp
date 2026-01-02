
const monthAbrv = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
]


class DateUtils {
  TODAY_PERIOD = "today";
  WEEK_PERIOD = "week";
  MONTH_PERIOD = "month";
  YEAR_PERIOD = "year";
  PREV_DAY_PERIOD = "prevDay";
  PREV_WEEK_PERIOD = "prevWeek";
  PREV_MONTH_PERIOD = "prevMonth";
  PREV_YEAR_PERIOD = "prevYear";


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

  monthAsString(date=new Date(),abrv=true){
    if (abrv){
      let month = date.getMonth();
      return monthAbrv[month];
    }

  }

  setDateBack(date,days=1){
    try {      
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");
      const dateCopy = new Date(date);

      dateCopy.setDate(date.getDate() - days);
      
      return dateCopy;
    } catch (error) {
      console.error(error.message);
    }
  }
  setMonthBack(date=new Date(),months=1){
    try {
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");
      const dateCopy = new Date(date);
      dateCopy.setMonth(dateCopy.getMonth() - months);
      return dateCopy;
    } catch (error) {
      console.error(error.message);
    }
  }
  setYearBack(date=new Date(),years=1){
    try {
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");
      const dateCopy = new Date(date);
      dateCopy.setYear(dateCopy.getFullYear() - years);
      return dateCopy;
    } catch (error) {
      console.error(error.message);
    }
  }

  getStartOfWeek(date=new Date(),day=0){
    try {
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");
      debugger;
      const dayOfWeek = date.getDay();
      const startDate = new Date(date);
      const diff = (date.getDate() - dayOfWeek) + day;
      startDate.setDate(diff);
      startDate.setHours(0,0,0,0);
      return startDate;
    } catch (error) {
      console.error(error.message);
    }
  }
  getEndOfWeek(date= new Date(),day=0){
    try {
      const endOfWeek = new Date(date);
      const currentDay = endOfWeek.getDay();
      const daysUntilSaturday = 6 - currentDay;
      endOfWeek.setDate(endOfWeek.getDate() + daysUntilSaturday + day);
      endOfWeek.setHours(0,0,0,0);
      return endOfWeek;
    } catch (error) {
      
    }
  }
  getStartOfMonth(date=new Date()){
    try {
      if (!this.#isInstanceOfDate(date)) throw new TypeError("paramater is not of type Date");
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year,month,1,0,0,0,0);
    } catch (error) {
      console.error(error.message);
    }
  }
  getEndOfMonth(date=new Date()){
    try {
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year,month+1,0,0,0,0,0);
    } catch (error) {
      console.error(error.message);
    }
  }
  getFirstOfYear(date=new Date()){
    try {
      const fullYear = date.getFullYear();
      return new Date(fullYear,1,1,0,0,0,0);
    } catch (error) {
      console.error(error.message);
    }
  }
  getEndOfYear(date=new Date()){
    try {
      const fullYear = date.getFullYear();
      return new Date(fullYear,12,31,0,0,0,0);
    } catch (error) {
      console.error(error.message);
    }
  }

  getDateForPeriod(period,date=new Date()){
    try {      
      const dateRange = {
        startDate: new Date(date),
        endDate: new Date(date)
      }
      const now = new Date(date);
      switch (period) {
        case this.TODAY_PERIOD:
          break;
        case this.PREV_DAY_PERIOD:
          dateRange.startDate = this.setDateBack(now,1);
          dateRange.endDate = this.setDateBack(now,1);          
          break;
        case this.PREV_WEEK_PERIOD:
          dateRange.startDate = this.setDateBack(this.getStartOfWeek(now),7);
          dateRange.endDate = this.setDateBack(this.getStartOfWeek(now));          
          break;
        case this.PREV_MONTH_PERIOD:
          dateRange.startDate = this.getStartOfMonth(this.setMonthBack(now));
          dateRange.endDate = this.getEndOfMonth(this.setMonthBack(now));
          break;
        case this.PREV_YEAR_PERIOD:
          dateRange.startDate = this.getStartOfYear(this.setYearBack(now));
          dateRange.endDate = this.getEndOfYear(this.setYearBack(now));
          break;
        case this.WEEK_PERIOD:
          dateRange.startDate = this.getStartOfWeek(now);
          dateRange.endDate = this.getEndOfWeek(now);
          break;
        case this.MONTH_PERIOD:
          dateRange.startDate = this.getStartOfMonth(now);
          dateRange.endDate = this.getEndOfMonth(now);
          break;
        case this.YEAR_PERIOD:
          dateRange.startDate = this.getStartOfYear(now);
          dateRange.endDate = this.getEndOfYear(now);
          break;
        default:
          break;
      }
      return dateRange;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const DateUtility = new DateUtils();

export default DateUtility;
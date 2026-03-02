import Format from "../Utils/Format";


class ReportConfig {
  builderType = "";
  reportType = null;
  dateType = null;
  startDate = new Date();
  endDate = new Date();
  compareStartDate = null;
  compareEndDate = null;
  selectedMetrics = [];
  reportName = '';

  get dateRange(){
    return {
      base: {
        startDate: this.startDate,
        endDate: this.endDate
      },
      current: {
        startDate: this.compareStartDate,
        endDate: this.compareEndDate
      }
    }
  }

  get formattedDateRange(){
    return {
      base: {
        startDate: Format.toRequestDateFormat(this.startDate),
        endDate: Format.toRequestDateFormat(this.endDate)
      },
      current: {
        startDate: Format.toRequestDateFormat(this.compareStartDate),
        endDate: Format.toRequestDateFormat(this.compareEndDate)
      }
    }
  }
  
}
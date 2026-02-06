


class Query {
  action = "";
  type = "";
  dateRange;
  key;
  #adapter;

  constructor(action,type,adapter,dateRange,keyStrings=[]){
    this.action = action || "";
    this.type = type || "";
    this.#adapter = adapter;
    this.dateRange = dateRange;
    this.key = [`${action}_${type}`,...keyStrings,dateRange?.startDate,dateRange?.endDate]
  }

  adapter(data){
    const adaptedData = this.#adapter(data);
    return adaptedData;
  }
}

export default Query;
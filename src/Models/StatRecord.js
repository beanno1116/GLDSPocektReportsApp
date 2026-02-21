

class StatRecord {
  day = "";
  description = "";
  hour = "";
  #group = "";
  #lookup = "";
  number = "";  
  #periodEnd = "";
  #periodStart = "";
  quantity = 0;
  total = 0.00;
  weight = 0.00;

  constructor(recordObj){
    if (recordObj){
      this.day = recordObj?.day || "";
      this.description = recordObj?.description || "";
      this.hour = recordObj?.hour || "";
      this.#group = recordObj?.group || "";
      this.#lookup = recordObj?.lookup || "";
      this.number = recordObj?.number || "";
      this.#periodEnd = recordObj?.periodEnd || "";
      this.#periodStart = recordObj?.periodStart || "";
      this.quantity = recordObj?.quantity || 0;
      this.total = recordObj?.total || 0.00;
      this.weight = recordObj?.weight || 0.00;
    }
  }

  get group(){
    return this.#group;
  }
  get lookup(){
    return this.#lookup;
  }
}

class DepartmentStatRecord extends StatRecord {
  number = "";
  constructor(recordObj){
    super(recordObj);
    this.number = recordObj?.number || "";
  }
}

export default StatRecord;


class StatRecord {
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
      this.description = recordObj?.description || "";
      this.#group = recordObj?.group || "";
      this.quantity = recordObj?.quantity || 0;
      this.weight = recordObj?.weight || 0.00;
      this.total = recordObj?.total || 0.00;
      this.hour = recordObj?.hour || "";
      this.#lookup = recordObj?.lookup || "";
      this.#periodStart = recordObj?.periodStart || "";
      this.#periodEnd = recordObj?.periodEnd || "";
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
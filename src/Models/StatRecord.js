

class StatRecord {
  description = "";
  #group = "";
  quantity = 0;
  weight = 0.00;
  total = 0.00;
  #lookup = "";

  constructor(recordObj){
    if (recordObj){
      this.description = recordObj?.description || "";
      this.#group = recordObj?.group || "";
      this.quantity = recordObj?.quantity || 0;
      this.weight = recordObj?.weight || 0.00;
      this.total = recordObj?.total || 0.00;
      this.#lookup = recordObj?.lookup || "";
    }
  }

  get group(){
    return this.#group;
  }
  get lookup(){
    return this.#lookup;
  }
}

export default StatRecord;
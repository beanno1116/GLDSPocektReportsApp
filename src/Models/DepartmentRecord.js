

class DepartmentRecord {
  description = "";
  quantity = 0;
  weight = 0.00;
  total = 0.00;
  #departmentId = 0;
  #date = "";

  constructor(recordObj){
    if (recordObj){
      this.description = recordObj?.description || "";
      this.quantity = recordObj?.quantity || 0;
      this.weight = recordObj?.weight || 0.00;
      this.total = recordObj?.total || 0.00;
      this.#departmentId = recordObj?.departmentId || 0;
      this.#date = recordObj?.startDate || "";
    }
  }

  get departmentId(){
    return this.#departmentId;
  }
  get date(){
    return this.#date;
  }
}

export default DepartmentRecord;


class Store {
  agentString = "";
  id = "";
  sid = "";
  customer = "";
  name = "";
  type = "";
  address = "";
  addressTwo = "";
  city = "";
  state = "";
  zipcode = "";
  phoneNumber = "";
  altPhoneNumber = "";
  
  #createdBy;
  #modifiedBy;
  #creationDate;
  #modifiedDate;

  constructor(){
    this.#createdBy = "";
    this.#modifiedBy = "";
    this.#creationDate = "";
    this.#modifiedDate = "";
  }


}

export default Store;


class User {
  #id;
  username;
  orgId;
  isAdmin;
  stores;
  firstName;
  lastName;
  email;
  registeredDate;

  constructor(userObj){    
    if (userObj){
      this.#id = userObj.id || "";
      this.username = userObj.username || "";
      this.orgId = userObj.orgId || "";
      this.isAdmin = userObj.isAdmin || false;
      this.stores = userObj.stores || [];
      this.firstName = userObj.firstName || "";
      this.lastName = userObj.lastName || "";
      this.email = userObj.email || "";
      this.registeredDate = userObj.registeredDate || "";
      return;
    }
    this.#id = "";
    this.username = "";
    this.orgId = "";
    this.isAdmin = false;
    this.stores = [];
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.registeredDate = "";
  }

  get id(){
    return this.#id;
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  toString(){
    try {
      const obj = {
        id: this.#id,
        username: this.username,
        orgId: this.orgId,
        isAdmin: this.isAdmin,
        stores: this.stores,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        registeredDate: this.registeredDate
      }
      return JSON.stringify(obj);
      
    } catch (error) {
      console.error("[User] [toString] [ERROR] - unable to convert user obj to string. " + error.message);
    }
  }
  
}

export default User;


class User {
  #id;
  username;
  orgId;
  isAdmin;
  stores;
  firstName;
  lastName;
  email;

  constructor(userObj){
    if (userObj){
      this.#id = userObj.id;
      this.username = userObj.username;
      this.orgId = userObj.orgId;
      this.isAdmin = userObj.isAdmin;
      this.stores = userObj.stores;
      this.firstName = userObj.first;
      this.lastName = userObj.last;
      this.email = userObj.email;
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
  }

  get id(){
    return this.#id;
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  
}

export default User;
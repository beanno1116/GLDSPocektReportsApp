

class AppData {
  activeStore;
  #agentString;
  #didInit;
  #organization;
  #seats;
  stores;
  users;
  

  constructor(obj){
    if (obj) {
      return
    }
    this.activeStore = "";
    this.#agentString = "";
    this.#organization = "";
    this.#seats = "";
    this.stores = [];
    this.users = [];
  }

}
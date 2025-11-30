

class Organization {
  #id;
  name;
  stores;
  seats;
  users;

  constructor(org){
    if (org){
      this.#id = org?.id || "";
      this.name = org?.name || "";
      this.seats = org?.seats || 0;
      this.stores = org?.stores || [];
      this.users = org?.users || [];
      return;
    }
    this.#id = "";
    this.name = "";
    this.seats = -1;
    this.stores = [];
    this.users = [];
  }

  get id(){
    return parseInt(this.#id);
  }

  get numberOfSeatsAvailable(){
    try {
      let seatCount = this.seats - this.users.length;
      if (seatCount < 0){
        return 0;
      }
      return seatCount;
    } catch (error) {
      console.error(error.message);
      return 0;
    }
  }


  get numberOfSeatsUsed(){
    return this.stores.length;
  }
}

export default Organization;
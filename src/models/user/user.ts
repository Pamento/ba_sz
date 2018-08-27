import { Address } from "../address/address";
import { Group } from "../group/group";

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  greetingId: string;
  countryName: string;
  countryId: number;
  address: Address;
  cgu: boolean;
  groupId: number;
  group: Group;
  phone: string;
  subscriptionId: number;
  value: string;
  ocr: number;

  constructor(data?) {
    console.log("constructor", data);
    if (data) {
      this.update(data);
    }
  }

  update(data) {
    for (let key in data) {
      console.log("updating user", key, data);
      switch (key) {
        default:
          this[key] = data[key];
      }
    }
  }
  initAddress(): User {
    if (!this.address) {
      this.address = new Address();
    }
    return this;
  }
}

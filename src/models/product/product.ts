export class Product {
  id: number;
  value: string;
  name: string;
  description: string;
  help: string;
  documentNote: string;
  imageURL: string;
  price: number;
  isCalculated: boolean;
  qty: number;

  constructor(data?) {
    console.log("constructor", data);
    if (data) {
      this.update(data);
    }
  }

  update(data) {
    for (let key in data) {
      console.log("updating", key, data);
      switch (key) {
        default:
          this[key] = data[key];
      }
    }
  }
}

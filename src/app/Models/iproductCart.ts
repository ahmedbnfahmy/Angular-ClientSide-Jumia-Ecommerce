import { Data } from "@angular/router";

export interface Iproduct {
  
  _id?: string,
  name?: string,
  arname: any;
  imagePath?: Array<string>,
  totalPrice: number,
  category: string,
  arcategory: string,
  subcategory: string,
  arsubcategory: string,
  ratings: 1,
  description: string,
  ardescription: "",
  price: 170,
  countInStock: 10,
  isDeleted: false,
  createdAt: Data,
  updatedAt: Data,
}
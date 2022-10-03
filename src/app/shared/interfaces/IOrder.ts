import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrder {
  id: number;
  quantity: number;
  amount: number;
  product: IProduct;
  user: IUser;
  customer: ICustomer;
}

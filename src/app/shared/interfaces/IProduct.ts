import { ISelectItem } from "./core/ISelectItem";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  option?: ISelectItem;
}

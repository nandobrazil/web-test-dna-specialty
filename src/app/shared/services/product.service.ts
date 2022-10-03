import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { IProduct } from "../interfaces/IProduct";
import { BaseService } from "./core/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(ConfirmationService) confirmationService: ConfirmationService,
  ) {
    super('product', http, confirmationService);
  }
}

import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { IOrder } from "../interfaces/IOrder";
import { BaseService } from "./core/base.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<IOrder> {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(ConfirmationService) confirmationService: ConfirmationService,
  ) {
    super('order', http, confirmationService);
  }
}

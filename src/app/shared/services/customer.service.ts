import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { ICustomer } from "../interfaces/ICustomer";
import { BaseService } from "./core/base.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<ICustomer> {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(ConfirmationService) confirmationService: ConfirmationService,
  ) {
    super('customer', http, confirmationService);
  }
}

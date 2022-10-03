import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { IUser } from "../interfaces/IUser";
import { BaseService } from "./core/base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUser> {
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(ConfirmationService) confirmationService: ConfirmationService,
  ) {
    super('user', http, confirmationService);
  }
}

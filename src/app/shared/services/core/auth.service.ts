import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from '../../constants/storage-key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ACCESS_TOKEN = '@DNASPECIALTY/ACCESS_TOKEN';
  constructor(
    private router: Router
  ) {
  }

  isLogged() {
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN) === 'MOCK-JWT-TOKEN';
  }

  signIn() {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, 'MOCK-JWT-TOKEN');
    location.reload();
  }

  signOut() {
    this.clearTokens();
    location.reload();
  }

  clearTokens() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  }

}

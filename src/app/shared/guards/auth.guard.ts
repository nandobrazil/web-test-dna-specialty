import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/core/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  async canActivate() {
    const authenticated = this.authService.isLogged();
    if (!authenticated) {
      this.router.navigate(['/login']);
    }
    return authenticated;
  }
}

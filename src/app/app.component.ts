import { Component } from '@angular/core';
import { AuthService } from './shared/services/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogged: boolean;
  constructor(
    private authService: AuthService
  ) {
    this.isLogged = this.authService.isLogged();
  }
}

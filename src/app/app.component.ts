import { Component } from '@angular/core';
import { AuthService } from './shared/services/core/auth.service';
import { ILoading, LoadingService } from './shared/services/core/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading!: boolean;
  isLogged: boolean;
  constructor(
    private authService: AuthService,
    private loadingSrv: LoadingService
  ) {
    this.isLogged = this.authService.isLogged();
    this.loadingSrv.isLoading().subscribe(load => this.loading = load);
  }
}

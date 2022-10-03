import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/core/auth.service';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLogged: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.isLogged = this.authService.isLogged();
    this.breadcrumbService.setItems([
      { label: 'Início', routerLink: '/home' },
      { label: 'Dashboard' }
    ])
  }

  ngOnInit(): void {
    if (!this.isLogged)
      this.router.navigate(['/login']);
  }

}

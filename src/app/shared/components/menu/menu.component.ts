import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isVerified = true;
  items: MenuItem[];
  constructor(
    private router: Router
  ) {
    this.items = [
      {
          label: 'Início',
          icon: 'pi pi-home',
          routerLink: '/home'
      },
      {
          label: 'Usuários',
          icon: 'pi pi-fw pi-users',
          routerLink: '/user'

      },
      {
        label: 'Clientes',
        icon: 'fa-solid fa-people-group',
        routerLink: '/customer'
      },
      {
        label: 'Produtos',
        icon: 'fa-solid fa-box-open',
        routerLink: '/product'
      },
      {
        label: 'Vendas',
        icon: 'fa-solid fa-money-check-dollar',
        routerLink: '/order'
      }
  ];

  }

  ngOnInit(): void {
  }


  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}

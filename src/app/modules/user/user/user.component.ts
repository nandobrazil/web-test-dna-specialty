import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPagination } from 'src/app/shared/interfaces/core/IPagination';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];
  pagination: IPagination;
  first = 0;
  filter = '';
  constructor(
    private breadcrumbService: BreadcrumbService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'Usuários', routerLink: '/user' }
    ]);
    this.pagination = {
      pageNumber: 1,
      pageSize: 10,
      totalRecords: 0,
      totalPages: 0
    }
  }

  ngOnInit(): void {
  }

  async loadUsers(event?: any) {
    let sort;
    if (event) {
      this.pagination.pageNumber = event.first > 0 ? (event.first / this.pagination.pageSize) + 1 : 1;
      this.first = 0;
      if (event.sortField) {
        sort = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
      }
    }
    const { success, data, pagination } = await this.userService.GetAllPaginated({
      page: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize,
      order: sort,
      search: { filter: this.filter }
    });
    if (success) {
      this.users = data;
      this.pagination = pagination;
    }
  }

  receiveFilter(filter: string) {
    this.filter = filter;
    this.loadUsers();
  }

  handleEdit(idCustomer: number) {
    this.router.navigate([`/user/${idCustomer}`])
  }

  async handleDelete(user: IUser) {
    const result = await this.userService.delete(user, {
      message: `Deseja realmente excluir o usuário ${user.name}?`,
    });

    if (result) {
      this.showMessage('Sucesso', 'success', `O usuário ${user.name} foi excluido com sucesso.`);
      this.loadUsers();
    }
  }

  showMessage(summary: string, severity: string, detail: string) {
    this.messageService.add({ summary, severity, detail });
  }

}

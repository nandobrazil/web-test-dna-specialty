import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPagination } from 'src/app/shared/interfaces/core/IPagination';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: ICustomer[] = [];
  pagination: IPagination;
  first = 0;
  filter = '';
  constructor(
    private breadcrumbService: BreadcrumbService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'Clientes', routerLink: '/customer' }
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

  async loadCustomers(event?: any) {
    let sort;
    if (event) {
      this.pagination.pageNumber = event.first > 0 ? (event.first / this.pagination.pageSize) + 1 : 1;
      this.first = 0;
      if (event.sortField) {
        sort = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
      }
    }
    const { success, data, pagination } = await this.customerService.GetAllPaginated({
      page: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize,
      order: sort,
      search: { filter: this.filter }
    });
    if (success) {
      this.customers = data;
      this.pagination = pagination;
    }
  }

  formatCNPJ(value: string) {
    if (value)
      if (value.length === 14)
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
    return ' ';
  }

  receiveFilter(filter: string) {
    this.filter = filter;
    this.loadCustomers();
  }

  handleEdit(idCustomer: number) {
    this.router.navigate([`/customer/${idCustomer}`])
  }

  async handleDelete(customer: ICustomer) {
    const result = await this.customerService.delete(customer, {
      message: `Deseja realmente excluir o cliente ${customer.corporateName}?`,
    });

    if (result) {
      this.showMessage('Sucesso', 'success', `O cliente ${customer.corporateName} foi excluido com sucesso.`);
      this.loadCustomers();
    }
  }

  showMessage(summary: string, severity: string, detail: string) {
    this.messageService.add({ summary, severity, detail });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPagination } from 'src/app/shared/interfaces/core/IPagination';
import { IOrder } from 'src/app/shared/interfaces/IOrder';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  orders: IOrder[] = [];
  pagination: IPagination;
  first = 0;
  filter = '';
  constructor(
    private breadcrumbService: BreadcrumbService,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'Vendas', routerLink: '/order' }
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

  async loadOrders(event?: any) {
    let sort;
    if (event) {
      this.pagination.pageNumber = event.first > 0 ? (event.first / this.pagination.pageSize) + 1 : 1;
      this.first = 0;
      if (event.sortField) {
        sort = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
      }
    }
    const { success, data, pagination } = await this.orderService.GetAllPaginated({
      page: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize,
      order: sort,
      search: { filter: this.filter }
    });
    if (success) {
      this.orders = data as IOrder[];
      this.pagination = pagination;
    }
  }

  receiveFilter(filter: string) {
    this.filter = filter;
    this.loadOrders();
  }

  handleEdit(idCustomer: number) {
    this.router.navigate([`/order/${idCustomer}`])
  }

  async handleDelete(order: IOrder) {
    const result = await this.orderService.delete(order, {
      message: `Deseja realmente excluir a venda ${order.id}?`,
    });

    if (result) {
      this.showMessage('Sucesso', 'success', `A venda ${order.id} foi excluida com sucesso.`);
      this.loadOrders();
    }
  }

  showMessage(summary: string, severity: string, detail: string) {
    this.messageService.add({ summary, severity, detail });
  }

}

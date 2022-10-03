import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPagination } from 'src/app/shared/interfaces/core/IPagination';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: IProduct[] = [];
  pagination: IPagination;
  first = 0;
  filter = '';
  constructor(
    private breadcrumbService: BreadcrumbService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.breadcrumbService.setItems([
      { label: 'Produtos', routerLink: '/product' }
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

  async loadProducts(event?: any) {
    let sort;
    if (event) {
      this.pagination.pageNumber = event.first > 0 ? (event.first / this.pagination.pageSize) + 1 : 1;
      this.first = 0;
      if (event.sortField) {
        sort = `${event.sortField},${event.sortOrder === 1 ? 'asc' : 'desc'}`;
      }
    }
    const { success, data, pagination } = await this.productService.GetAllPaginated({
      page: this.pagination.pageNumber,
      pageSize: this.pagination.pageSize,
      order: sort,
      search: { filter: this.filter }
    });
    if (success) {
      this.products = data;
      this.pagination = pagination;
    }
  }

  receiveFilter(filter: string) {
    this.filter = filter;
    this.loadProducts();
  }

  handleEdit(idCustomer: number) {
    this.router.navigate([`/customer/${idCustomer}`])
  }

  async handleDelete(product: IProduct) {
    const result = await this.productService.delete(product, {
      message: `Deseja realmente excluir o produto ${product.name}?`,
    });

    if (result) {
      this.showMessage('Sucesso', 'success', `O produto ${product.name} foi excluido com sucesso.`);
      this.loadProducts();
    }
  }

  showMessage(summary: string, severity: string, detail: string) {
    this.messageService.add({ summary, severity, detail });
  }

}

import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ISelectItem } from 'src/app/shared/interfaces/core/ISelectItem';
import { IOrder, IOrderRequest } from 'src/app/shared/interfaces/IOrder';
import { FormatDocument } from 'src/app/shared/pipes/format-document.pipe';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss']
})
export class OrderManageComponent implements OnInit {

  idOrder!: number;
  order: IOrder = {} as IOrder;
  formOrder!: FormGroup;

  customerOptions: ISelectItem[] = [];
  userOptions: ISelectItem[] = [];
  productOptions: ISelectItem[] = [];
  totalPrice = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private userService: UserService,
    private currency: CurrencyPipe,
    private format: FormatDocument
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id'])
        this.getOrder(param['id']);
    });
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    this.buildFormOrder();
    this.loadOptions();
  }

  buildFormOrder() {
    this.formOrder = this.formBuilder.group({
      product: ['', Validators.required],
      idUser: ['', [ Validators.required ]],
      idCustomer: ['', [ Validators.required ]],
      amount: ['', [ Validators.required ]]
    });
  }

  setFormOrder(order: IOrder) {
    const item = order.product.option!;
    const product = {
      label: `${item.label} - ${this.currency.transform(item.data, 'BRL')}`,
      value: item.value,
      data: item.data
    }
    this.formOrder.controls['product'].setValue(product);
    this.formOrder.controls['idUser'].setValue(order.user.id);
    this.formOrder.controls['idCustomer'].setValue(order.customer.id);
    this.formOrder.controls['amount'].setValue(order.quantity);
    this.setTotalPrice();
  }

  async loadOptions() {
    await this.loadCustomerOptions();
    await this.loadUserOptions();
    await this.loadProductOptions();
  }

  async loadCustomerOptions() {
    const { success, data } = await this.customerService.GetAllOptions();

    if (success) {
      this.customerOptions = data!.map(item => {
        return {
          label: `${item.label} - ${this.format.transform(item.data)}`,
          value: item.value
        }
      });
    }
  }

  async loadUserOptions() {
    const { success, data } = await this.userService.GetAllOptions();

    if (success) {
      this.userOptions = data!.map(item => {
        return {
          label: `${item.label} - ${this.format.transform(item.data)}`,
          value: item.value
        }
      });;
    }
  }

  async loadProductOptions() {
    const { success, data } = await this.productService.GetAllOptions();

    if (success) {
      this.productOptions = data!.map(item => {
        return {
          label: `${item.label} - ${this.currency.transform(item.data, 'BRL')}`,
          value: item.value,
          data: item.data
        }
      });
    }
  }

  setTotalPrice() {
    const price = this.formOrder.controls['product'].value.data;
    const amount = this.formOrder.controls['amount'].value;
    this.totalPrice = price ? price * amount : 0;
  }

  async getOrder(idOrder: number) {
    const { success, data } = await this.orderService.GetById(idOrder);
    if (success) {
      this.order = data as IOrder;
      this.setFormOrder(this.order);
      this.idOrder = (data as IOrder).id;
    } else {
      this.handleCancel();
    }
  }

  setBreadcrumb() {
    this.breadcrumbService.setItems([
      { label: 'Vendas', routerLink: '/order' },
      { label: 'Gerenciar' }
    ]);
  }

  handleCancel() {
    this.router.navigate(['/order']);
  }

  async handleSave() {
    const sender: IOrderRequest = {
      id: this.idOrder,
      idProduct: this.formOrder.controls['product'].value.value,
      idUser: this.formOrder.controls['idUser'].value,
      idCustomer: this.formOrder.controls['idCustomer'].value,
      amount: this.formOrder.controls['amount'].value
    }
    const isUpdate = !!this.idOrder;
    const { success } = await this.orderService[isUpdate ? 'put' :'post'](sender);

    if (success) {
      this.messageService.add({
        summary: 'Sucesso',
        severity: 'success',
        detail: `Venda salva com sucesso.`
      });
      this.handleCancel();
    }
  }

  validateForm() {
    return this.formOrder && this.formOrder.valid;
  }

}

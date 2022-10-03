import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit {


  idProduct!: number;
  product: IProduct = {} as IProduct;
  formProduct!: FormGroup;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id'])
        this.getProduct(param['id']);
    });
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    this.buildFormProduct();
  }

  buildFormProduct() {
    this.formProduct = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
    });
  }

  setFormProduct(product: IProduct) {
    this.formProduct.controls['name'].setValue(product.name);
    this.formProduct.controls['price'].setValue(product.price);
  }

  async getProduct(idCustomer: number) {
    const { success, data } = await this.productService.GetById(idCustomer);
    if (success) {
      this.product = data!;
      this.setFormProduct(this.product);
      this.idProduct = data!.id;
    } else {
      this.handleCancel();
    }
  }

  setBreadcrumb() {
    this.breadcrumbService.setItems([
      { label: 'Produtos', routerLink: '/product' },
      { label: 'Gerenciar' }
    ]);
  }

  handleCancel() {
    this.router.navigate(['/product']);
  }

  async handleSave() {
    const sender = {
      id: this.idProduct,
      name: this.formProduct.controls['name'].value,
      price: this.formProduct.controls['price'].value,
    }
    const isUpdate = !!this.idProduct;
    const { success } = await this.productService[isUpdate ? 'put' :'post'](sender);

    if (success) {
      this.messageService.add({
        summary: 'Sucesso',
        severity: 'success',
        detail: `Produto salvo com sucesso.`
      });
      this.handleCancel();
    }
  }

  validateForm() {
    return this.formProduct && this.formProduct.valid;
  }

}

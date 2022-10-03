import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ICustomer } from 'src/app/shared/interfaces/ICustomer';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DocumentValidatorDirective } from 'src/app/shared/utils/document-validador/document.validator.directive';

@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss']
})
export class CustomerManageComponent implements OnInit {

  idCustomer!: number;
  customer: ICustomer = {} as ICustomer;
  formCustomer!: FormGroup;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id'])
        this.getCustomer(param['id']);
    });
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    this.buildFormCustomer();
  }

  buildFormCustomer() {
    this.formCustomer = this.formBuilder.group({
      corporateName: ['', Validators.required],
      cnpj: ['', [Validators.required, DocumentValidatorDirective.validate]]
    });
  }

  setFormCustomer(customer: ICustomer) {
    this.formCustomer.controls['corporateName'].setValue(customer.corporateName);
    this.formCustomer.controls['cnpj'].setValue(customer.cnpj);
  }

  async getCustomer(idCustomer: number) {
    const { success, data } = await this.customerService.GetById(idCustomer);
    if (success) {
      this.customer = data!;
      this.setFormCustomer(this.customer);
      this.idCustomer = data!.id;
    } else {
      this.handleCancel();
    }
  }

  setBreadcrumb() {
    this.breadcrumbService.setItems([
      { label: 'Clientes', routerLink: '/customer' },
      { label: 'Gerenciar' }
    ]);
  }

  handleCancel() {
    this.router.navigate(['/customer']);
  }

  async handleSave() {
    const sender = {
      id: this.idCustomer,
      corporateName: this.formCustomer.controls['corporateName'].value,
      cnpj: this.formCustomer.controls['cnpj'].value,
    }
    const isUpdate = !!this.idCustomer;
    const { success } = await this.customerService[isUpdate ? 'put' :'post'](sender);

    if (success) {
      this.messageService.add({
        summary: 'Sucesso',
        severity: 'success',
        detail: `Cliente salvo com sucesso.`
      });
      this.handleCancel();
    }
  }

  validateForm() {
    return this.formCustomer && this.formCustomer.valid;
  }

}

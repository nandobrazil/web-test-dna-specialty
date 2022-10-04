import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { BreadcrumbService } from 'src/app/shared/services/core/breadcrumb.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DocumentValidatorDirective } from 'src/app/shared/utils/document-validador/document.validator.directive';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  idUser!: number;
  user: IUser = {} as IUser;
  formUser!: FormGroup;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id'])
        this.getUser(param['id']);
    });
    this.setBreadcrumb();
  }

  ngOnInit(): void {
    this.buildFormUser();
  }

  buildFormUser() {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      cpf: ['', [Validators.required, DocumentValidatorDirective.validate]]
    });
  }

  setFormUser(user: IUser) {
    this.formUser.controls['name'].setValue(user.name);
    this.formUser.controls['login'].setValue(user.login);
    this.formUser.controls['cpf'].setValue(user.cpf);
  }

  async getUser(idUser: number) {
    const { success, data } = await this.userService.GetById(idUser);
    if (success) {
      this.user = data!;
      this.idUser = data!.id;
      this.setFormUser(this.user);
    } else {
      this.handleCancel();
    }
  }

  setBreadcrumb() {
    this.breadcrumbService.setItems([
      { label: 'Usuários', routerLink: '/user' },
      { label: 'Gerenciar' }
    ]);
  }

  handleCancel() {
    this.router.navigate(['/user']);
  }

  async handleSave() {
    if (this.formUser.controls['password'].value !== this.formUser.controls['confirmpassword'].value) {
      this.messageService.add({
        summary: 'Erro',
        severity: 'warn',
        detail: `As senhas digitadas não conferem`
      });
      return;
    }
    const sender = {
      id: this.idUser,
      name: this.formUser.controls['name'].value,
      login: this.formUser.controls['login'].value,
      cpf: this.formUser.controls['cpf'].value,
      password: this.formUser.controls['cpf'].value,
    }
    const isUpdate = !!this.idUser;
    const { success } = await this.userService[isUpdate ? 'put' :'post'](sender);

    if (success) {
      this.messageService.add({
        summary: 'Sucesso',
        severity: 'success',
        detail: `Usuário salvo com sucesso.`
      });
      this.handleCancel();
    }
  }

  validateForm() {
    return this.formUser && this.formUser.valid;
  }

}

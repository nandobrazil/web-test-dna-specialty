import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    UserManageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    SharedModule,
  ]
})
export class UserModule { }

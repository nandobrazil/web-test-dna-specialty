import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerManageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class CustomerModule { }

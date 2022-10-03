import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    OrderComponent,
    OrderManageComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CustomerRoutingModule,
    FormsModule,
    CoreModule,
    SharedModule,
  ]
})
export class OrderModule { }

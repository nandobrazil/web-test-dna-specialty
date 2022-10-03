import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'new',
    component: OrderManageComponent
  },
  {
    path: ':id',
    component: OrderManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreModule,
    FormsModule,
    SharedModule,
  ]
})
export class ProductModule { }

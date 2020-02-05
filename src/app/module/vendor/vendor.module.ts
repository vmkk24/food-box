import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { ListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModuleModule } from '../../shared/shared-module.module';

@NgModule({
  declarations: [ListComponent, CartComponent, OrderSummaryComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModuleModule
  ]
})
export class VendorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { ListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModuleModule } from '../../shared/shared-module.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [ListComponent, CartComponent, OrderSummaryComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModuleModule,
    RadioButtonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class VendorModule { }

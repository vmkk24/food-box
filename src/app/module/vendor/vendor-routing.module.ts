import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'list/:id',
    component: ListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

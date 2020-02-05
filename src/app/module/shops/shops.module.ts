import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopComponent } from './shop/shop.component';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    CarouselModule
  ]
})
export class ShopsModule { }

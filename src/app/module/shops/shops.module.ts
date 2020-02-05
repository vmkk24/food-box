import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopComponent } from './shop/shop.component';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    CarouselModule,
    CardModule,
    ButtonModule
  ]
})
export class ShopsModule { }

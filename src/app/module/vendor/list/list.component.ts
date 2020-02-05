import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message-service';
import { ConditionalExpr } from '@angular/compiler';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  spinner = false;
  menulistVeg: any;
  menulistNonVeg: any;
  foodList = [];
  vendorId = 0;
  total = 0;
  cartFlag = false;
  constructor(
    public api: Service,
    private url: UrlConfig,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  /* Get Destinaton
  */
  public getDestination(id) {
    this.spinner = true;
    this.api.getList(this.url.urlConfig().vendorMenu).subscribe(list => {
      this.spinner = false;
      list.forEach(item => {
        if (item.nonVeg) {
          this.menulistNonVeg = this.addQuantityFlag(item.nonVeg);
        }
        if (item.veg) {
          this.menulistVeg = this.addQuantityFlag(item.veg);
        }

      });
    }, error => {
      this.spinner = false;
    });
  }
  private addQuantityFlag(item) {
    item.forEach(element => {
      element.quantity = 0;
    });
    return item;
  }
  public addFood(item) {
    item.quantity += 1;
    if (this.foodList && this.foodList.length) {
      const index = this.foodList.findIndex(card => card.foodId === item.foodId);
      if (index !== -1) {
        this.foodList[index].quantity += 1;
      } else {
        this.foodList.push({
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price
        });
      }
    } else {
      this.foodList.push({
        foodId: item.foodId,
        quantity: item.quantity,
        price: item.price
      });
    }
    const finalList = {
      paymentType: null,
      vendorId: this.vendorId,
      totalAmount: this.total,
      foodList: this.foodList
    };
    this.cartFlag = true;
    sessionStorage.setItem('cart', JSON.stringify(finalList));
    this.messageService.sendMessage({ cart: finalList });
  }

  public removeItem(item, type) {
    const cartList = JSON.parse(sessionStorage.getItem('cart'));
    const index = cartList.foodList.findIndex(card => card.foodId === item.foodId);
    if (index !== -1) {
      if (cartList.foodList[index].quantity ) {
        cartList.foodList[index].quantity -= 1;
        if (type === 'menulistVeg') {
          const vegIndex =  this.menulistVeg.findIndex(card => card.foodId === item.foodId);
          this.menulistVeg[vegIndex].quantity -= 1;
        } else {
          const nonVegIndex =  this.menulistNonVeg.findIndex(card => card.foodId === item.foodId);
          this.menulistNonVeg[nonVegIndex].quantity -= 1;
        }
      } else {
        cartList.foodList.splice(index, 1);
      }
    }
    if (cartList.foodList.length) {
      this.cartFlag = false;
    }
    sessionStorage.setItem('cart', JSON.stringify(cartList));
    this.messageService.sendMessage({ cart: cartList });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.getDestination(params.id);
      this.vendorId = params.id;
    });
  }

}

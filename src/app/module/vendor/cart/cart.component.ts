import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails = JSON.parse(sessionStorage.getItem('cart'));
  spinner = false;
  totalAmount = 0;
  paymentOptionFlag = false;
  paymentType = 'PAYTM';
  constructor(
    public api: Service,
    private url: UrlConfig,
    private router: Router,
    private messageService: MessageService
  ) { }

  private calculatePrice(items) {
    items.foodList.forEach(cart => {
      cart.totalPrice = cart.quantity * cart.price;
    });
    this.calculateTotal();
  }
  public addQuantity(item) {
    item.quantity += 1;
    item.totalPrice = item.quantity * item.price;
    this.calculateTotal();
  }
  public removeQuantity(item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.price;
      this.calculateTotal();
    } else {
      this.api.alertConfig = this.api.modalConfig('Error', 'Quantity should be atleast one', true, [{ name: 'Ok' }]);
    }
  }

  public removeCart(item) {
    const index = this.cartDetails.foodList.findIndex(card => card.foodId === item.foodId);
    if (index !== -1) {
      this.cartDetails.foodList.splice(index, 1);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cartDetails));
    this.messageService.sendMessage({ cart: this.cartDetails });
    this.calculateTotal();
  }
  /* Modal Action
  @param Ok modal has been closed
 */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.spinner = false;
      this.api.alertConfigDefaultValue();
    }
  }

  private calculateTotal() {
    let total = 0;
    this.cartDetails.foodList.forEach(cart => {
      total += cart.totalPrice;
    });
    this.totalAmount = total;
  }

  public checkout() {
    this.paymentOptionFlag = true;
    this.cartDetails.paymentType = this.paymentType;
    this.cartDetails.totalAmount = this.totalAmount;
  }
  ngOnInit() {
    if (this.cartDetails) {
      this.calculatePrice(this.cartDetails);
    }
  }

  placeOrder = () => {
    const user = this.api.loggedUser();
    const params = `/${user.employeeId}/orders`;
    this.cartDetails.vendorId =  Number(this.cartDetails.vendorId);
    this.api.postCall(this.url.urlConfig().placeOrder.concat(params), this.cartDetails, 'post').subscribe(order => {
      if (order) {
        this.spinner = false;
      } else {
        this.cartDetails = [];
        sessionStorage.setItem('cart', JSON.stringify(this.cartDetails));
        this.messageService.sendMessage({ cart: this.cartDetails });
      }
    });
  }

}

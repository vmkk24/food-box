import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  spinner = false;
  orderSummary = [];
  constructor(
    public api: Service,
    private url: UrlConfig,
  ) { }

    /* get Order list */
  private geOrderSummary(): void {
    this.spinner = true;
    const user = this.api.loggedUser();
    const params = `/${user.employeeId}/orders`;
    this.api.getList(this.url.urlConfig().orderSummary.concat(params)).subscribe(order => {
        this.spinner = false;
        this.orderSummary = order;
    }, error => {
      this.spinner = false;
    });
  }
  ngOnInit() {
    this.geOrderSummary();
  }

}

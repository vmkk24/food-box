import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  spinner = false;
  products: any;
  responsiveOptions;
  constructor(public api: Service,
              private url: UrlConfig,
              private router: Router) {
  }

  ngOnInit() {
    this.geProductList();
  }

  /* get data list */
  private geProductList(): void {
    this.spinner = true;
    this.api.getList(this.url.urlConfig().vendors).subscribe(data => {
      if (data) {
        this.spinner = false;
        this.products = data;
        console.log('productd', this.products);
      }
    }, error => {
      this.spinner = false;
    });
  }
  viewMenu() {
    // this.router.navigate(['/vendor']);
  }
}

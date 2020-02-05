import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.175:8080/mealbox/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    urlApi() {
        return this.url = {
            userLogin: this.apiMock + 'users',
            userList: this.apiMock + 'users',
            vendorMenu: this.apiMock + 'ItemcategoryList',
            brand: this.apiMock + 'brands',
            vendors: this.apiHost + 'vendors',
            placeOrder: this.apiMock + 'employees',
            orderSummary: this.apiMock + 'employees',
        };
    }
    urlConfig() {
        return  this.urlApi() ;
    }
}

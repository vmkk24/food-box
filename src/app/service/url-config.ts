import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.181:8080/mealbox/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
            userLogin: 'http://10.117.189.175:8080/mealbox/' + 'employees',
            userList: this.apiMock + 'users',
            vendorMenu: this.apiMock + 'ItemcategoryList',
            brand: this.apiMock + 'brands',
            vendors: this.apiHost + 'vendors',
            placeOrder: this.apiMock + 'employees',
            orderSummary: this.apiMock + 'employees',
        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'employees',
            userList: this.apiHost + 'users',
            vendorMenu: this.apiHost + 'vendors/',
            vendors: this.apiHost + 'vendors',
            placeOrder: this.apiHost + 'employees',
            orderSummary: this.apiHost + 'employees',
        };
    }

     /* return url */
    urlConfig() {
        return  this.serverConfig ? this.urlApi() : this.urlMock() ;
    }
}

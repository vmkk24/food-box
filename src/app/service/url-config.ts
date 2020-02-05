import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = false;
    private apiHost = 'http://10.117.189.181:8080/flightbooking/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    urlApi() {
        return this.url = {
            userLogin: this.apiMock + 'users',
            userList: this.apiMock + 'users',
            vendorMenu: this.apiMock + 'ItemcategoryList',
            brand: this.apiMock + 'brands'
        };
    }
    urlConfig() {
        return  this.urlApi() ;
    }
}

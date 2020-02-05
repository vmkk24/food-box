import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUser } from './model/model';
import { Router } from '@angular/router';
import { MessageService } from './service/message-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  userDetails: CurrentUser;

  constructor(
    private router: Router,
    private messageService: MessageService) { }


  /* Get loggged user details from subject subscription */
  private getLoginUser(): void {
    /* subscribe to home component messages */
    this.subscription = this.messageService.getMessage().subscribe(userData => {
      if (userData) {
        this.userDetails = userData;
      } else {
        this.userDetails = {
          employeeName: null,
          employeeId: null,
          role: null,
          cart: []
        };
      }
    });
  }

  ngOnInit() {
    /*Get logged user */
    this.getLoginUser();
  }
  ngOnDestroy() {
   /* unsubscribe to ensure no memory leaks */
    this.subscription.unsubscribe();
  }
}

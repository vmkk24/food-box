import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    public api: Service,
    private url: UrlConfig,
    private router: Router
  ) { }
  private createForm() {
    this.loginForm = this.fb.group({
      employeeId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  /*  Access to form fields */
  get login() { return this.loginForm.controls; }

  /* Login */
  public onClickSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.spinner = true;
      const postObject = {
        employeeId: Number(this.loginForm.value.employeeId),
        password: this.loginForm.value.password
      };
      /* Api call*/
      this.api.postCall(this.url.urlConfig().userLogin, postObject, 'post').subscribe(user => {
        if (user.employeeId) {
          const userDetails = {
            employeeName: user.employeeName,
            employeeId: user.employeeId,
            role: user.role,
          };
          this.router.navigate(['/home']);
          /* Stored the user details in session storage */
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.spinner = false;
        } else {
          this.api.alertConfig = this.api.modalConfig('Error', 'Username/Password is not valid', true, [{ name: 'Ok' }]);
          this.spinner = false;
        }
      });
    }
  }
  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.api.alertConfigDefaultValue();
    }
  }

  /* Oninit call */
  ngOnInit() {
    /* Check whether login/not */
    if (!this.api.validUser()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
    /* Call the form creation while on component initiation */
    this.createForm();
  }

}

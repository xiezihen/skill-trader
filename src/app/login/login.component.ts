import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first, timeout } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpClient: any;
  notValid: boolean;
  loginForm: FormGroup;
  error: any;
  loading: boolean;
  userNotFound: boolean;
  submitted: boolean;
  //password for admin Admin.69
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.notValid = false;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.notValid = true;
      setTimeout(() => this.notValid = false, 2000);
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
        user => {
          if (user.token) {
            this.router.navigate(['posts']);
          } else {
          this.userNotFound = true;
          setTimeout(() => this.userNotFound = false, 3000);
          this.router.navigate(['login']);
          }
        },
        error => {
            this.router.navigate(['login']);
            this.error = error;
            this.loading = false;
        });
  }
}

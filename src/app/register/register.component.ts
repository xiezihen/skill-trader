import { Component, OnInit } from '@angular/core';
import { UserInfo} from '../_models/UserInfo';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Response} from '../_models/Response';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserInfo;
  res: Response;
  submitted: boolean;
  formGroup: any;
  registerForm: FormGroup;
  doesExist: boolean;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {

  }

  ngOnInit() {
    this.submitted = false;
    this.doesExist = false;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4),
         Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_.-]*$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]*')
        ]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.pattern('[a-zA-Z]*')]],
      city: ['', [Validators.pattern('[a-zA-Z]*')]]
  });
  }
  onSubmit() {
    this.formGroup  = this.registerForm.controls;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {

      this.submitted = true;
      setTimeout(() => this.submitted = false, 3000);
      this.formGroup.username.touched = true;
      this.formGroup.password.touched = true;
      this.formGroup.email.touched = true;
      return;
    }
    this.user = {
      username : this.formGroup.username.value ,
      password : this.formGroup.password.value,
      displayname: this.formGroup.username.value,
      email : this.formGroup.email.value,
      firstName: this.formGroup.firstName.value,
      lastName: this.formGroup.lastName.value,
      city: this.formGroup.city.value,
      about: 'Hi, i\'m ' + this.formGroup.firstName.value

    };

    this.http.post(`${environment.apiUrl}/register`, this.user).subscribe((response) => {
    this.res = JSON.parse(JSON.stringify(response));

    if (parseInt(this.res.status, 10) < 400) {
      this.router.navigate(['login']);
    } else {
      this.doesExist = true;
      setTimeout(() => this.doesExist = false, 3000);
    }

  });


  }

}


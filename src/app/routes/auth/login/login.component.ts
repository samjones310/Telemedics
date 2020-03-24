import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as _ from 'lodash';

import { ApiService } from '../../../services/api.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import config from '../../../app.config';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  loading = false;
  email = '';
  checked=false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    if (this.localStorageService.get('user')) {
      this.email = this.localStorageService.get('user')['email'];
    }

    this.loginForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    if (_.get(this.route, 'snapshot.queryParamMap.params.verified')) {
      this.snackBar.open('Your account has been verified');
    }
  }

  getErrorMessage(fieldName) {
    if (fieldName === 'email') {
      return this.loginForm.controls.email.hasError('required')
        ? 'Email is required'
        : this.loginForm.controls.email.hasError('email')
        ? 'Email is not valid'
        : '';
    }

    return this.loginForm.controls[fieldName].hasError('required')
      ? fieldName + ' is required'
      : '';
  }

  onSubmit() {
    this.loading = true;
    this.apiService.login(this.loginForm.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.snackBar.open('Login Successful');
        this.localStorageService.set('user', data.user);
        this.localStorageService.set('role', data.user.role);
        delete data.user;
        this.localStorageService.set('accessToken', data);
        this.apiService.getAccessToken();
        this.router.navigateByUrl('/home');
      },
      error => {
        console.log(error);
        this.loading = false;

        try {
          if (error.error.error.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED') {
            return this.snackBar.open('Please verify your email id');
          }
        } catch (e) {}

        this.snackBar.open('Unable to login');
      }
    );
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, Validators, FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as _ from 'lodash';

import { ApiService } from '../../../services/api.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import config from '../../../app.config';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email:     ['', [Validators.required, Validators.email]]
    });
  }

  getErrorMessage(fieldName) {
    if (fieldName === 'email') {
      return this.forgotForm.controls.email.hasError('required') ? 'Email is required' :
        this.forgotForm.controls.email.hasError('email') ? 'Email is not valid' : '';
    }

    return this.forgotForm.controls[fieldName].hasError('required') ? fieldName + ' is required' : '';
  }

  onSubmit() {
    this.loading = true;
    this.apiService.forgot(this.forgotForm.value).subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.snackBar.open('Please open your email for further instructions');
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
      this.loading = false;
      const errMsg = _.get(error, 'error.error.message', 'Unable to send reset password email');
      this.snackBar.open(errMsg);
    });
  }

}

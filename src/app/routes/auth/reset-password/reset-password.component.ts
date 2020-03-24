import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, Validators, FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as _ from 'lodash';

import { ApiService } from '../../../services/api.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import config from '../../../app.config';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm;
  loading = false;
  accessToken = '';

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
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      rePassword:  ['', [Validators.required]]
    }, {
      validator: MustMatch('newPassword', 'rePassword')
    });

    if (_.get(this.route, 'snapshot.queryParamMap.params')) {
      this.accessToken = this.route.snapshot.queryParamMap['params'].token;
    }
  }

  getErrorMessage(fieldName) {
    try {
      if (this.resetForm.controls.rePassword.errors.mustMatch) {
        return 'Passwords do not match'
      }
    } catch (e) {}

    return this.resetForm.controls[fieldName].hasError('required') ? fieldName + ' is required' : '';
  }

  onSubmit() {
    this.loading = true;
    this.apiService.reset(this.accessToken, this.resetForm.value).subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.snackBar.open('Password has been reset, please login with your new password.');
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
      this.loading = false;
      this.snackBar.open('Unable to update password');
    });
  }

}

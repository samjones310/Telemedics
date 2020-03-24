import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, Validators, FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as _ from 'lodash';

import { ApiService } from '../../../services/api.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import config from '../../../app.config';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name:  ['', [Validators.required]],
      username:  ['', [Validators.required]],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required]]
    });
  }

  getErrorMessage(fieldName) {
    if (fieldName === 'email') {
      return this.signupForm.controls.email.hasError('required') ? 'Email is required' :
        this.signupForm.controls.email.hasError('email') ? 'Email is not valid' : '';
    }

    return this.signupForm.controls[fieldName].hasError('required') ? fieldName + ' is required' : '';
  }

  onSubmit() {
    this.loading = true;
    this.apiService.signUp(this.signupForm.value).subscribe((data: any) => {
      this.loading = false;
      console.log(data);
      this.snackBar.open('Registration Successful', null, {
        verticalPosition: 'top',
        duration: 5000
      });
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
      this.loading = false;
      this.snackBar.open('Error occurred', 'OK');
    });
  }
}

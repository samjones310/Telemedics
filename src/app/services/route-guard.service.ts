import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import config from '../app.config';
import _ from 'lodash';

import { ApiService } from './api.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const self = this;
    return new Promise((resolve, reject) => {
      const user = self.localStorageService.get('user');
      const accessToken = self.localStorageService.get('accessToken');

      // TODO: verify user accessToken from backend

      if (user && accessToken) {
        resolve(true);
      } else {
        this.snackBar.open('Please login');
        this.router.navigateByUrl('/login');
        reject();
      }
    });
  }
}

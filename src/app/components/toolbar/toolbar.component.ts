import { Component, OnInit, Directive, AfterViewInit } from '@angular/core';
import { SidenavServiceService } from 'src/app/services/sidenav-service.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  sidebarToggle = false;
  loggedIn = true;
  loading = false;
  user;
  constructor(
    private sidenavService: SidenavServiceService,
    private apiService: ApiService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.sidenavService.changeToggleStatus.subscribe((isOpen: boolean) => {
      this.sidebarToggle = isOpen;
    });
  }

  onToggle(event: Event) {
    this.sidebarToggle = !this.sidebarToggle;
    this.sidenavService.toggle(this.sidebarToggle);
  }

  ngOnInit() {
    this.localStorageService.get('user')
      ? (this.loggedIn = true)
      : (this.loggedIn = false);
  }

  logout() {
    this.apiService.logout().subscribe(
      (data: any) => {
        console.log('success: ', data);
        this.logoutDone();
      },
      error => {
        console.log('error: ', error);
        this.logoutDone();
      }
    );
  }

  logoutDone() {
    this.loading = false;
    this.localStorageService.clearAll();
    this.snackBar.open('Logged out');
    this.router.navigateByUrl('/login');
    window.location.reload();
  }
}

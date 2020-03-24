import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavServiceService } from 'src/app/services/sidenav-service.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

export interface Sidebar {
  route: string;
  icon: string;
  text: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sideNav', { read: MatSidenav, static: true })
  public sidenav: MatSidenav;

  isOpen = false;
  sidebarToggle = false;
  sidebars: Sidebar[] = [
    {
      route: '/home',
      icon: 'dashboard',
      text: 'Dashboard',
      alt: 'Dashboard'
    },
    {
      route: '/applications',
      icon: 'assessment',
      text: 'Applications',
      alt: 'Applications'
    }
  ];

  constructor(
    private sidebarService: SidenavServiceService,
    private sidenavService: SidenavServiceService,
    public router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sidebarService.changeToggleStatus.subscribe((isOpen: boolean) => {
      this.sidenav.toggle(isOpen);
      this.isOpen = isOpen;
    });
  }

  goToPage(page) {
    if (this.isOpen) {
      this.router.navigateByUrl(page);
      this.sidenav.close();
      this.isOpen = false;
    } else {
      this.sidenav.open();
      this.isOpen = true;
    }
    this.sidenavService.toggle(this.isOpen);
  }

  backdropClicked(event: any) {
    console.log(event);
    this.isOpen = false;
    this.sidenavService.toggle(this.isOpen);
  }
  onToggle(event: Event) {
    this.sidebarToggle = !this.sidebarToggle;
    this.sidenavService.toggle(this.sidebarToggle);
  }
}

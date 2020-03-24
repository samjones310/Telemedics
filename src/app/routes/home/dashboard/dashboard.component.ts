import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  draftApplications: object[];
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDiscardDialog(): void {


    
  }
}

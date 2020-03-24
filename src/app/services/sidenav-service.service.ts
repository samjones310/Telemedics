import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavServiceService {
  constructor() {}
  isOpen = false;

  @Output() changeToggleStatus: EventEmitter<boolean> = new EventEmitter();

  toggle(isOpen: boolean) {
    this.isOpen = isOpen !== undefined ? isOpen : !this.isOpen;
    this.changeToggleStatus.emit(this.isOpen);
  }
}

import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'google-licensing-frontend';

  iconList = [
    'Bitmap',
    'buzz',
    'c-check',
    'Check2',
    'c-question',
    'circle-09',
    'Check',
    'folder-15',
    'Hamburger',
    'License',
    'man',
    'mtx',
    'pin-4',
    'User'
  ];

  // add the collection of mat icons
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    for (const icon of this.iconList) {
      this.matIconRegistry.addSvgIcon(
        `icon_${icon}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `../assets/${icon}.svg`
        )
      );
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './info-banner.component.html'
})
export class InfoBannerComponent {

}

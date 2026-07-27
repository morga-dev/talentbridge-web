import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FeaturedOpportunitiesComponent } from './components/featured-opportunities/featured-opportunities.component';
import { InfoBannerComponent } from './components/info-banner/info-banner.component';

@Component({
  selector: 'app-landing',
  imports: [
    MatButtonModule,
    MatIconModule,
    AboutComponent,
    ContactComponent,
    InfoBannerComponent,
    FeaturedOpportunitiesComponent
  ],
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  private readonly router = inject(Router);

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

}

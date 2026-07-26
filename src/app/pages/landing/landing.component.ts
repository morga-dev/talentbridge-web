import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(
    private router: Router,
  ) {}

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

}
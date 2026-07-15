import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PageHeaderComponent, SearchInputComponent, MetricCardsComponent, MetricCard } from '../../../../shared/components';
import { CandidateCardComponent } from '../../components/candidate-card/candidate-card.component';
import { CandidateApplicant, UpcomingCompanyInterview } from '../../models/company.model';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SearchInputComponent,
    MetricCardsComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CandidateCardComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class CompanyDashboardComponent {
  private router = inject(Router);

  companyName = 'UpTap';
  companyInitials = 'UPT';

  readonly profileCompletion = signal(85);

  readonly metrics = computed<MetricCard[]>(() => [
    { label: 'Vacantes activas', value: 4 },
    { label: 'Candidatos nuevos', value: 6 },
    { label: 'Postulaciones', value: 21 }
  ]);

  readonly upcomingInterview = signal<UpcomingCompanyInterview | null>({
    candidateName: 'Diego Morga',
    jobTitle: 'Desarrollador Frontend Jr',
    date: '12 jul 2026',
    time: '4:00 p.m.'
  });

  readonly unreadNotificationsCount = signal(3);

  // Datos de prueba
  readonly recentCandidates = signal<CandidateApplicant[]>([
    {
      id: 1,
      fullName: 'Diego Morga',
      initials: 'DM',
      career: 'Ing. de Software',
      appliedFor: 'Desarrollador Frontend Jr',
      appliedDate: '10 jul 2026',
      status: 'entrevista'
    },
    {
      id: 2,
      fullName: 'Francisco Mérida',
      initials: 'FM',
      career: 'Ing. de Software',
      appliedFor: 'Practicante de QA',
      appliedDate: '9 jul 2026',
      status: 'aplicado'
    },
    {
      id: 3,
      fullName: 'Roberto Zacatenco',
      initials: 'RZ',
      career: 'Ing. de Software',
      appliedFor: 'Soporte Técnico Jr',
      appliedDate: '8 jul 2026',
      status: 'aplicado'
    }
  ]);

  onSearch(query: string): void {
    this.router.navigate(['/'], { queryParams: { q: query } });
  }

  onCompleteProfile(): void {
    this.router.navigate(['/profile-company']);
  }

  onPostNewJob(): void {
    this.router.navigate(['/']);
  }

  onViewAllCandidates(): void {
    this.router.navigate(['/']);
  }

  onViewNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  onViewInterviewDetails(): void {
    this.router.navigate(['/']);
  }
}

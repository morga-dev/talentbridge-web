import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PageHeaderComponent, SearchInputComponent, MetricCardsComponent, MetricCard } from '../../../../shared/components';
import { JobCardComponent } from '../../../../shared/components/job-card/job-card.component';
import { Job } from '../../../../shared/models/jobs.model'; 
import { UpcomingInterview } from '../../models/student.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SearchInputComponent,
    MetricCardsComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    JobCardComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class StudentDashboardComponent {
  private router = inject(Router);

  userName = 'Morga';
  userInitials = 'DM';

  readonly profileCompletion = signal(70);

  readonly metrics = computed<MetricCard[]>(() => [
    { label: 'Postulaciones', value: 3 },
    { label: 'En entrevista', value: 1 },
    { label: 'Recientes', value: 2 }
  ]);

  readonly upcomingInterview = signal<UpcomingInterview | null>({
    jobTitle: 'Desarrollador Frontend Jr',
    company: 'UpTap',
    date: '12 jul 2026',
    time: '4:00 p.m.'
  });

  readonly unreadNotificationsCount = signal(2);

  // Datos de prueba
  readonly recommendedJobs = signal<Job[]>([
    {
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      tags: ['Angular', 'Remoto'],
      location: 'Tapachula, Chiapas, MX'
    },
    {
      title: 'Practicante de QA',
      company: 'Politécnica',
      tags: ['Manual Testing', 'SQL'],
      location: 'Híbrido · Tapachula, Chiapas, MX'
    },
    {
      title: 'Soporte Técnico Jr',
      company: 'Grupo Monkey',
      tags: ['Redes', 'Presencial'],
      location: 'Tapachula, Chiapas, MX'
    }
  ]);

  onSearch(query: string): void {
    this.router.navigate(['/'], { queryParams: { q: query } });
  }

  onCompleteProfile(): void {
    this.router.navigate(['/profile-student']);
  }

  onViewAllJobs(): void {
    this.router.navigate(['/']);
  }

  onViewNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  onViewInterviewDetails(): void {
    this.router.navigate(['/applications']);
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ApplicationDetail } from '../../../models';
import { ApplicationStatus } from '../../../../../shared/models';
import { PageHeaderComponent, EmptyStateComponent } from '../../../../../shared/components';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    PageHeaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './application-detail.component.html'
})
export class ApplicationDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Datos de prueba
  private readonly allDetails = signal<ApplicationDetail[]>([
    {
      id: 1,
      type: 'Vacante',
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      requirements: ['Angular', 'Tailwind', 'Git'],
      modality: 'Remoto',
      date: '10 jul 2026',
      status: 'interview',
      description:
        'Buscamos un desarrollador frontend junior apasionado por la tecnología para unirse a nuestro equipo. Trabajarás con tecnologías modernas y mentores experimentados en un ambiente colaborativo.',
      responsibilities: [
        'Implementar componentes de UI a partir de diseños en Figma',
        'Colaborar con el equipo de backend para consumir APIs REST',
        'Participar en revisiones de código y reuniones ágiles'
      ],
      benefits: ['Horario flexible', 'Home office', 'Capacitación continua'],
      salaryRange: '$12,000 - $16,000 MXN mensuales',
      publishedDate: '28 jun 2026',
      deadlineDate: '20 jul 2026',
      appliedDate: '10 jul 2026',
      companyInitials: 'UPT',
      companyDescription: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
      companyWebsite: 'https://uptap.com',
      statusHistory: [
        { status: 'pending', label: 'Postulación enviada', date: '10 jul 2026' },
        { status: 'interview', label: 'Entrevista agendada', date: '12 jul 2026' },
        { status: 'accepted', label: 'Resultado final', date: null }
      ]
    }
  ]);

  private readonly applicationId = computed(() => Number(this.route.snapshot.paramMap.get('id')));

  readonly application = computed(() =>
    this.allDetails().find((a) => a.id === this.applicationId())
  );

  onWithdraw(): void {
    console.log('Retirar postulación:', this.application()?.title);
    // lógica
  }

  onViewCompany(): void {
    this.router.navigate(['/student/company/1']);
  }

  goBack(): void {
    this.router.navigate(['/student/applications']);
  }

  statusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'reviewing':
        return 'En revisión';
      case 'interview':
        return 'En entrevista';
      case 'accepted':
        return 'Aceptada';
      case 'rejected':
        return 'Rechazada';
    }
  }

  statusColor(status: ApplicationStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'accepted':
        return 'primary';
      case 'interview':
        return 'accent';
      case 'rejected':
        return 'warn';
      default:
        return undefined;
    }
  }

  typeIcon(type: string): string {
    return type === 'Beca' ? 'school' : 'work';
  }
}

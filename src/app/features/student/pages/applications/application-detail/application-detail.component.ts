import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ApplicationDetail, ApplicationStatus  } from '../../../models/student.model'; 

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule
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
      status: 'entrevista',
      description:
        'Buscamos un desarrollador frontend junior para unirse a nuestro equipo. Trabajarás directamente con diseñadores y backend developers construyendo la próxima generación de la plataforma UpTap.',
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
      companyInitials: 'UP',
      companyDescription: 'Plataforma de conexión laboral para talento joven en el sur de México.',
      companyWebsite: 'https://uptap.com',
      statusHistory: [
        { status: 'aplicado', label: 'Postulación enviada', date: '10 jul 2026' },
        { status: 'entrevista', label: 'Entrevista agendada', date: '12 jul 2026' },
        { status: 'aceptada', label: 'Resultado final', date: null }
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
    console.log('Ver perfil de:', this.application()?.company);
  }

  goBack(): void {
    this.router.navigate(['/applications']);
  }

  statusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'aplicado':
        return 'Aplicado';
      case 'entrevista':
        return 'En entrevista';
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
    }
  }

  statusColor(status: ApplicationStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'aceptada':
        return 'primary';
      case 'entrevista':
        return 'accent';
      case 'rechazada':
        return 'warn';
      case 'aplicado':
      default:
        return undefined;
    }
  }

  typeIcon(type: string): string {
    return type === 'Beca' ? 'school' : 'work';
  }
}

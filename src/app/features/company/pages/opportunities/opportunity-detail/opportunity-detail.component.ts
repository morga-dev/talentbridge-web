import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent, ConfirmDialogComponent, LoadingSkeletonComponent, EmptyStateComponent } from '../../../../../shared/components';
import type { ConfirmDialogData, OpportunityDetail, CandidateApplicant, OpportunityStatus, ApplicationStatus } from '../../../../../shared/models';

@Component({
  selector: 'app-opportunity-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    PageHeaderComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent
  ],
  templateUrl: './opportunity-detail.component.html'
})
export class OpportunityDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly loading = signal(true);

  private readonly opportunityId = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: null }
  );

  private readonly allDetails = signal<OpportunityDetail[]>([
    {
      id: 1,
      company: {
        id: 1,
        name: 'UPTAP',
        phone: 9611234567,
        email: 'contacto@uptap.com',
        industry: 'Tecnología / Software',
        about: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
        sizeRange: '11-30 empleados',
        foundedYear: 2020,
        website: 'https://uptap.com'
      },
      title: 'Desarrollador Frontend Jr',
      description: 'Buscamos un desarrollador frontend junior apasionado por la tecnología para unirse a nuestro equipo. Trabajarás con tecnologías modernas y mentores experimentados en un ambiente colaborativo.',
      requirements: [
        'Conocimientos básicos de HTML, CSS y JavaScript',
        'Familiaridad con framework moderno Angular',
        'Manejo básico de Git',
        'Disponibilidad para aprender y trabajar en equipo'
      ],
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
      location: 'Tapachula, Chiapas',
      modality: 'Remoto',
      salaryRange: '$12,000 - $16,000 MXN',
      employmentType: 'Tiempo completo',
      createdAt: '10 jul 2026',
      expirationDate: '10 ago 2026',
      status: 'active',
      estimatedApplyMinutes: 15
    },
    {
      id: 2,
      company: {
        id: 1,
        name: 'UPTAP',
        phone: 9611234567,
        email: 'contacto@uptap.com',
        industry: 'Tecnología / Software',
        about: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
        sizeRange: '11-30 empleados',
        foundedYear: 2020,
        website: 'https://uptap.com'
      },
      title: 'Practicante de QA',
      description: 'Buscamos un practicante de QA para asegurar la calidad de nuestras aplicaciones. Aprenderás sobre pruebas manuales y automatizadas con la guía de nuestro equipo de calidad.',
      requirements: [
        'Conocimientos básicos de pruebas de software',
        'Atención al detalle',
        'Habilidades de comunicación',
        'Conocimientos básicos de SQL'
      ],
      technologies: ['Manual Testing', 'SQL', 'Postman', 'JIRA'],
      location: 'Tapachula, Chiapas',
      modality: 'Híbrido',
      salaryRange: '$6,000 - $8,000 MXN',
      employmentType: 'Práctica profesional',
      createdAt: '8 jul 2026',
      expirationDate: '8 ago 2026',
      status: 'active',
      estimatedApplyMinutes: 20
    },
    {
      id: 3,
      company: {
        id: 1,
        name: 'UPTAP',
        phone: 9611234567,
        email: 'contacto@uptap.com',
        industry: 'Tecnología / Software',
        about: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
        sizeRange: '11-30 empleados',
        foundedYear: 2020,
        website: 'https://uptap.com'
      },
      title: 'Beca de Desarrollo de Software',
      description: 'Programa de beca para estudiantes interesados en iniciar su carrera en desarrollo de software. Recibirás capacitación teórica y práctica con proyectos reales.',
      requirements: [
        'Ser estudiante activo de Ingeniería o afín',
        'Promedio mínimo de 8.5',
        'Disponibilidad de 4 horas diarias',
        'Ganas de aprender'
      ],
      technologies: ['JavaScript', 'HTML/CSS', 'Python', 'Git'],
      location: 'Tapachula, Chiapas',
      modality: 'Presencial',
      salaryRange: '$4,000 MXN mensuales',
      employmentType: 'Beca',
      createdAt: '5 jul 2026',
      expirationDate: '5 ago 2026',
      status: 'draft',
      estimatedApplyMinutes: 10
    }
  ]);

  private readonly allCandidates = signal<CandidateApplicant[]>([
    {
      id: 1,
      fullName: 'Diego Morga',
      initials: 'DM',
      career: 'Ing. de Software',
      appliedFor: 'Desarrollador Frontend Jr',
      appliedDate: '10 jul 2026',
      status: 'pending'
    },
    {
      id: 2,
      fullName: 'Francisco Mérida',
      initials: 'FM',
      career: 'Ing. de Software',
      appliedFor: 'Desarrollador Frontend Jr',
      appliedDate: '9 jul 2026',
      status: 'reviewing'
    },
    {
      id: 3,
      fullName: 'Roberto Zacatenco',
      initials: 'RZ',
      career: 'Ing. de Software',
      appliedFor: 'Desarrollador Frontend Jr',
      appliedDate: '8 jul 2026',
      status: 'interview'
    }
  ]);

  readonly opportunity = computed(() => {
    const id = this.opportunityId();
    return id ? this.allDetails().find(o => o.id === id) : null;
  });

  readonly notFound = computed(() => !this.loading() && !this.opportunity());

  readonly applicantsForThis = computed(() =>
    this.allCandidates().filter(c => c.appliedFor === this.opportunity()?.title)
  );

  readonly applicantsCount = computed(() => this.applicantsForThis().length);

  readonly metrics = computed(() => {
    const apps = this.applicantsForThis();
    return [
      { label: 'Totales', value: apps.length },
      { label: 'Nuevas', value: apps.filter(a => a.status === 'pending').length },
      { label: 'En entrevista', value: apps.filter(a => a.status === 'interview').length }
    ];
  });

  constructor() {
    setTimeout(() => this.loading.set(false), 600);
  }

  goBack(): void {
    this.router.navigate(['/company/opportunities']);
  }

  onEdit(): void {
    const id = this.opportunityId();
    if (id) {
      this.router.navigate(['/company/opportunities/create'], { queryParams: { id } });
    }
  }

  onToggleStatus(): void {
    const opp = this.opportunity();
    if (!opp) return;

    const newStatus: OpportunityStatus = opp.status === 'active' ? 'draft' : 'active';
    const isPublishing = newStatus === 'active';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `${isPublishing ? 'Publicar' : 'Pausar'} oportunidad`,
        message: `¿Deseas ${isPublishing ? 'publicar' : 'pausar'} "${opp.title}"?`,
        confirmText: isPublishing ? 'Publicar' : 'Pausar',
        confirmColor: 'primary',
        cancelText: 'Cancelar',
        icon: isPublishing ? 'publish' : 'pause_circle'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) return;

      this.allDetails.update(list =>
        list.map(o => o.id === opp.id ? { ...o, status: newStatus } : o)
      );

      this.snackBar.open(
        `Oportunidad ${isPublishing ? 'publicada' : 'pausada'} con éxito`,
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    });
  }

  onDelete(): void {
    const opp = this.opportunity();
    if (!opp) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar oportunidad',
        message: `¿Estás seguro de eliminar "${opp.title}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        confirmColor: 'warn',
        cancelText: 'Cancelar',
        icon: 'delete_forever'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) return;

      this.snackBar.open('Oportunidad eliminada correctamente', 'Cerrar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      this.router.navigate(['/company/opportunities']);
    });
  }

  // --- MÉTODOS PARA EL ESTADO DE LA OPORTUNIDAD ---
  opportunityStatusLabel(status: OpportunityStatus): string {
    switch (status) {
      case 'active': return 'Activa';
      case 'draft': return 'Borrador';
      case 'closed': return 'Cerrada';
      case 'expired': return 'Vencida';
    }
  }

  opportunityStatusColor(status: OpportunityStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'active': return 'primary';
      case 'draft': return undefined;
      case 'closed':
      case 'expired': return 'warn';
    }
  }

  // --- MÉTODOS PARA EL ESTADO DEL CANDIDATO ---
  candidateStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'pending': return 'Nuevo';
      case 'reviewing': return 'Revisión';
      case 'interview': return 'Entrevista';
      case 'accepted': return 'Aceptado';
      case 'rejected': return 'Rechazado';
    }
  }

  candidateStatusColor(status: ApplicationStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'pending': return undefined;
      case 'reviewing': return 'accent';
      case 'interview': return 'primary';
      case 'accepted': return 'primary';
      case 'rejected': return 'warn';
    }
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageHeaderComponent, ConfirmDialogComponent, LoadingSkeletonComponent, EmptyStateComponent } from '../../../../../shared/components';
import type { ConfirmDialogData } from '../../../../../shared/models';
import type { CandidateApplicationDetail, ApplicationStatusStep, ApplicationStatus } from '../../../../../shared/models';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    PageHeaderComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent
  ],
  templateUrl: './application-detail.component.html'
})
export class ApplicationDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly loading = signal(true);
  readonly changingStatus = signal(false);

  private readonly allDetails = signal<CandidateApplicationDetail[]>([
    {
      id: 1,
      initials: 'DM',
      fullName: 'Diego Morga',
      career: 'Ing. de Software',
      university: 'UPTAP',
      semester: '9° cuatrimestre',
      graduationYear: '2026',
      email: 'example@email.com',
      phone: 9621234567,
      skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Git', 'SQL'],
      about: 'Estudiante de último semestre apasionado por el desarrollo frontend. Con experiencia en proyectos escolares y freelance.',
      cvUrl: '#',
      githubUrl: 'https://github.com/morga-dev',
      linkedinUrl: 'https://linkedin.com/in/',
      opportunityTitle: 'Desarrollador Frontend Jr',
      appliedDate: '10 jul 2026',
      status: 'pending',
      statusHistory: [
        { status: 'pending', label: 'Postulación recibida', date: '10 jul 2026' },
        { status: 'reviewing', label: 'En revisión', date: null },
        { status: 'interview', label: 'Entrevista', date: null },
        { status: 'accepted', label: 'Aceptado', date: null }
      ]
    }
  ]);

  // Conversión reactiva de parámetros de URL usando toSignal
  private readonly applicationId = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: null }
  );

  readonly application = computed(() => {
    const id = this.applicationId();
    return id ? this.allDetails().find(a => a.id === id) : null;
  });

  readonly notFound = computed(() => !this.loading() && !this.application());

  constructor() {
    setTimeout(() => this.loading.set(false), 600);
  }

  goBack(): void {
    this.router.navigate(['/company/applications']);
  }

  onOpenCv(): void {
    const app = this.application();
    if (app?.cvUrl && app.cvUrl !== '#') {
      window.open(app.cvUrl, '_blank');
    } else {
      this.snackBar.open('CV no disponible', 'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
    }
  }

  onChangeStatus(newStatus: ApplicationStatus): void {
    const app = this.application();
    if (!app) return;

    const labels: Record<ApplicationStatus, string> = {
      pending: 'Nuevo',
      reviewing: 'Pasar a revisión',
      interview: 'Agendar entrevista',
      accepted: 'Aceptar candidato',
      rejected: 'Rechazar candidato'
    };

    const descriptions: Partial<Record<ApplicationStatus, string>> = {
      reviewing: 'El candidato pasará a la etapa de revisión.',
      interview: 'El candidato pasará a la etapa de entrevista.',
      accepted: 'Esta acción notificará al candidato que fue aceptado.',
      rejected: 'Esta acción notificará al candidato que fue rechazado.'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: labels[newStatus] ?? 'Cambiar estado',
        message: `¿Deseas cambiar el estado de "${app.fullName}" a "${labels[newStatus]}"? ${descriptions[newStatus] ?? ''}`,
        confirmText: labels[newStatus] ?? 'Cambiar',
        confirmColor: newStatus === 'rejected' ? 'warn' : 'primary',
        cancelText: 'Cancelar',
        icon: newStatus === 'rejected' ? 'block' : 'arrow_forward'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) return;

      this.changingStatus.set(true);

      this.allDetails.update(list =>
        list.map(a =>
          a.id === app.id
            ? { ...a, status: newStatus, statusHistory: this.updateTimeline(a.statusHistory, newStatus) }
            : a
        )
      );

      setTimeout(() => {
        this.changingStatus.set(false);
        this.snackBar.open(
          `Estado actualizado a "${labels[newStatus]}"`,
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
      }, 400);
    });
  }

  private updateTimeline(history: ApplicationStatusStep[], newStatus: ApplicationStatus): ApplicationStatusStep[] {
    const today = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
    return history.map(step =>
      step.status === newStatus ? { ...step, date: today } : step
    );
  }

  statusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'pending': return 'Nuevo';
      case 'reviewing': return 'En revisión';
      case 'interview': return 'En entrevista';
      case 'accepted': return 'Aceptado';
      case 'rejected': return 'Rechazado';
      default: return status;
    }
  }

  statusColor(status: ApplicationStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'accepted': return 'primary';
      case 'interview': return 'accent';
      case 'rejected': return 'warn';
      default: return undefined;
    }
  }
}

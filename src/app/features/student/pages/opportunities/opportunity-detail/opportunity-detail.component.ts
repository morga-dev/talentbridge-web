import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import {
  ConfirmDialogComponent,
  EmptyStateComponent,
  LoadingSkeletonComponent,
} from '../../../../../shared/components';
import type { OpportunityDetail, OpportunitySummary, ConfirmDialogData } from '../../../../../shared/models';

@Component({
  selector: 'app-opportunity-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    ConfirmDialogComponent,
    EmptyStateComponent,
    LoadingSkeletonComponent
  ],
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly id = input<string>();

  readonly loading = signal(true);
  readonly opportunity = signal<OpportunityDetail | null>(null);
  readonly similarOpportunities = signal<OpportunitySummary[]>([]);
  readonly isSaved = signal(false);

  readonly publishedLabel = computed(() => {
    const job = this.opportunity();
    return job ? this.formatPublished(job.createdAt) : '';
  });

  ngOnInit(): void {
    const currentId = this.id();
    this.fetchOpportunity(currentId ?? null);
  }

  toggleSave(): void {
    this.isSaved.update((v) => !v);
  }

  onApply(): void {
    const job = this.opportunity();
    if (!job) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Postularte a esta vacante',
        message: `¿Deseas postularte a "${job.title}" en ${job.company.name}?`,
        confirmText: 'Postularme',
        cancelText: 'Cancelar',
        icon: 'send'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) return;

      this.snackBar.open('Postulación enviada correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      this.router.navigate(['/student/applications']);
    });
  }

  onShare(): void {
    const job = this.opportunity();
    if (!job) return;

    if (navigator.share) {
      navigator.share({ title: job.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  private fetchOpportunity(id: string | null): void {
    this.loading.set(true);

    // Cancelamos el temporizador si el componente es destruido mientras carga
    const timer = setTimeout(() => {
      this.opportunity.set({
        id: Number(id) || 1,
        company: {
          id: 1,
          name: 'UpTap',
          industry: 'Tecnología / Software',
          phone: 9629876543,
          email: 'contacto@uptap.com',
          about: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
          sizeRange: '11-30 empleados',
          foundedYear: 2020
        },
        title: 'Desarrollador Frontend Jr',
        description:
          'Buscamos un desarrollador frontend junior apasionado por la tecnología para unirse a nuestro equipo. Trabajarás con tecnologías modernas y mentores experimentados en un ambiente colaborativo.',
        requirements: [
          'Conocimientos básicos de HTML, CSS y JavaScript',
          'Familiaridad con framework moderno Angular',
          'Manejo básico de Git',
          'Disponibilidad para aprender y trabajar en equipo'
        ],
        technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'],
        location: 'Tapachula, Chiapas, MX',
        modality: 'Remoto',
        salaryRange: '$12,000 - $16,000 MXN mensuales',
        employmentType: 'Tiempo completo',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        estimatedApplyMinutes: 5
      });

      this.similarOpportunities.set([
        { id: 2, title: 'Practicante de QA', company: 'UpTap', tags: [], location: 'Tapachula, Chiapas, MX', modality: 'Híbrido', salaryRange: '$6,000 - $8,000 MXN' },
        { id: 3, title: 'Beca de Desarrollo de Software', company: 'UpTap', tags: [], location: 'Tapachula, Chiapas, MX', modality: 'Presencial', salaryRange: '$4,000 MXN mensuales' }
      ]);

      this.loading.set(false);
    }, 400);

    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }

  private formatPublished(dateIso: string): string {
    const days = Math.floor((Date.now() - new Date(dateIso).getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Publicada hoy';
    if (days === 1) return 'Publicada hace 1 día';
    return `Publicada hace ${days} días`;
  }
}
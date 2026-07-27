import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes Compartidos
import {
  PageHeaderComponent,
  SearchInputComponent,
  MetricCardsComponent,
  LoadingSkeletonComponent,
  EmptyStateComponent,
  ConfirmDialogComponent,
  FilterBarComponent
} from '../../../../../shared/components';
import type { FilterOption } from '../../../../../shared/models';

import type { MetricCard, ConfirmDialogData, OpportunityStatus, OpportunitySummary } from '../../../../../shared/models';



@Component({
  selector: 'app-opportunity-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTooltipModule,
    PageHeaderComponent,
    SearchInputComponent,
    MetricCardsComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    FilterBarComponent
  ],
  templateUrl: './opportunity-list.component.html'
})
export class OpportunityListComponent {
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly loading = signal(true);
  readonly searchQuery = signal('');
  readonly statusFilter = signal<string>('all');

  readonly allOpportunities = signal<OpportunitySummary[]>([
    {
      id: 1,
      title: 'Desarrollador Frontend Jr',
      company: '',
      tags: [],
      employmentType: 'Tiempo completo',
      modality: 'Remoto',
      location: 'Tapachula, Chiapas',
      salaryRange: '$12,000 - $16,000 MXN',
      status: 'active',
      createdAt: '10 jul 2026',
      applicantsCount: 8
    },
    {
      id: 2,
      title: 'Practicante de QA',
      company: '',
      tags: [],
      employmentType: 'Práctica profesional',
      modality: 'Híbrido',
      location: 'Tapachula, Chiapas',
      status: 'active',
      createdAt: '8 jul 2026',
      applicantsCount: 12
    },
    {
      id: 3,
      title: 'Beca de Desarrollo de Software',
      company: '',
      tags: [],
      employmentType: 'Beca',
      modality: 'Presencial',
      location: 'Tapachula, Chiapas',
      salaryRange: '$4,000 MXN mensuales',
      status: 'draft',
      createdAt: '5 jul 2026',
      applicantsCount: 0
    },
    {
      id: 4,
      title: 'Soporte Técnico Jr',
      company: '',
      tags: [],
      employmentType: 'Tiempo completo',
      modality: 'Presencial',
      location: 'Tapachula, Chiapas',
      salaryRange: '$8,000 - $10,000 MXN',
      status: 'closed',
      createdAt: '1 jun 2026',
      applicantsCount: 15
    }
  ]);

  readonly metrics = computed<MetricCard[]>(() => {
    const all = this.allOpportunities();
    return [
      { label: 'Totales', value: all.length },
      { label: 'Activas', value: all.filter(o => o.status === 'active').length },
      { label: 'Inactivas', value: all.filter(o => o.status === 'draft').length }
    ];
  });

  readonly filterOptions = computed<FilterOption[]>(() => {
    const all = this.allOpportunities();
    return [
      { value: 'all', label: 'Todas', count: all.length },
      { value: 'active', label: 'Activas', count: all.filter(o => o.status === 'active').length },
      { value: 'draft', label: 'Inactivas', count: all.filter(o => o.status === 'draft').length },
      { value: 'closed', label: 'Cerradas', count: all.filter(o => o.status === 'closed').length }
    ];
  });

  readonly filteredOpportunities = computed(() => {
    const filter = this.statusFilter();
    const query = this.searchQuery().trim().toLowerCase();
    let opportunities = this.allOpportunities();

    if (filter !== 'all') {
      opportunities = opportunities.filter(o => o.status === filter);
    }

    if (query) {
      opportunities = opportunities.filter(
        o => o.title.toLowerCase().includes(query) ||
             (o.employmentType ?? '').toLowerCase().includes(query)
      );
    }

    return opportunities;
  });

  constructor() {
    setTimeout(() => this.loading.set(false), 600);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  onFilterChanged(value: string): void {
    this.statusFilter.set(value);
  }

  onView(id: number): void {
    this.router.navigate(['/company/opportunities', id]);
  }

  onEdit(id: number): void {
    this.router.navigate(['/company/opportunities/create'], { queryParams: { id } });
  }

  onCreate(): void {
    this.router.navigate(['/company/opportunities/create']);
  }

  // Alternar Pausar / Publicar
  onToggleStatus(opportunity: OpportunitySummary): void {
    const newStatus: OpportunityStatus = opportunity.status === 'active' ? 'draft' : 'active';
    const isPublishing = newStatus === 'active';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `${isPublishing ? 'Publicar' : 'Pausar'} oportunidad`,
        message: `¿Deseas ${isPublishing ? 'publicar' : 'pausar'} "${opportunity.title}"?`,
        confirmText: isPublishing ? 'Publicar' : 'Pausar',
        confirmColor: 'primary',
        cancelText: 'Cancelar',
        icon: isPublishing ? 'publish' : 'pause_circle'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.allOpportunities.update(list =>
        list.map(o => o.id === opportunity.id ? { ...o, status: newStatus } : o)
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

  // Eliminar Oportunidad
  onDelete(opportunity: OpportunitySummary): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar oportunidad',
        message: `¿Estás seguro de eliminar "${opportunity.title}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        confirmColor: 'warn',
        cancelText: 'Cancelar',
        icon: 'delete_forever'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.allOpportunities.update(list => list.filter(o => o.id !== opportunity.id));

      this.snackBar.open('Oportunidad eliminada correctamente', 'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
    });
  }

  statusLabel(status: string | undefined): string {
    switch (status) {
      case 'active': return 'Activa';
      case 'draft': return 'Inactiva';
      case 'closed': return 'Cerrada';
      case 'expired': return 'Vencida';
      default: return status ?? 'Desconocido';
    }
  }

  statusColor(status: string | undefined): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'active': return 'primary';
      case 'draft': return undefined;
      case 'closed': return 'warn';
      case 'expired': return 'warn';
      default: return undefined;
    }
  }
}

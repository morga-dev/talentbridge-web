import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  PageHeaderComponent,
  SearchInputComponent,
  MetricCardsComponent,
  FilterBarComponent,
  LoadingSkeletonComponent,
  EmptyStateComponent
} from '../../../../../shared/components';
import { CandidateCardComponent } from '../../../components/candidate-card/candidate-card.component';
import type { MetricCard, FilterOption, CandidateApplicant } from '../../../../../shared/models';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    PageHeaderComponent,
    SearchInputComponent,
    MetricCardsComponent,
    FilterBarComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    CandidateCardComponent
  ],
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent {
  readonly loading = signal(true);
  readonly searchQuery = signal('');
  readonly statusFilter = signal<string>('all');
  readonly opportunityFilter = signal<string>('all');

  readonly opportunityOptions = [
    { value: 'all', label: 'Todas las vacantes' },
    { value: 'Desarrollador Frontend Jr', label: 'Desarrollador Frontend Jr' },
    { value: 'Practicante de QA', label: 'Practicante de QA' },
    { value: 'Beca de Desarrollo de Software', label: 'Beca de Desarrollo de Software' }
  ];

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
      appliedFor: 'Practicante de QA',
      appliedDate: '8 jul 2026',
      status: 'interview'
    },
    {
      id: 4,
      fullName: 'Rigoberto Escobar',
      initials: 'RE',
      career: 'Ing. de Software',
      appliedFor: 'Beca de Desarrollo de Software',
      appliedDate: '5 jul 2026',
      status: 'accepted'
    },
    {
      id: 5,
      fullName: 'Luis Díaz',
      initials: 'LD',
      career: 'Ing. en Informática',
      appliedFor: 'Practicante de QA',
      appliedDate: '3 jul 2026',
      status: 'rejected'
    },
    {
      id: 6,
      fullName: 'Andrus García',
      initials: 'AG',
      career: 'Ing. de Software',
      appliedFor: 'Desarrollador Frontend Jr',
      appliedDate: '1 jul 2026',
      status: 'pending'
    }
  ]);

  readonly statusFilterOptions = computed<FilterOption[]>(() => {
    const all = this.allCandidates();
    return [
      { value: 'all', label: 'Todas', count: all.length },
      { value: 'pending', label: 'Nuevas', count: all.filter(c => c.status === 'pending').length },
      { value: 'reviewing', label: 'En revisión', count: all.filter(c => c.status === 'reviewing').length },
      { value: 'interview', label: 'Entrevista', count: all.filter(c => c.status === 'interview').length },
      { value: 'accepted', label: 'Aceptadas', count: all.filter(c => c.status === 'accepted').length },
      { value: 'rejected', label: 'Rechazadas', count: all.filter(c => c.status === 'rejected').length }
    ];
  });

  readonly metrics = computed<MetricCard[]>(() => {
    const all = this.allCandidates();
    return [
      { label: 'Totales', value: all.length },
      { label: 'Nuevas', value: all.filter(c => c.status === 'pending').length },
      { label: 'En entrevista', value: all.filter(c => c.status === 'interview').length }
    ];
  });

  readonly filteredCandidates = computed(() => {
    let candidates = this.allCandidates();

    const oppFilter = this.opportunityFilter();
    if (oppFilter !== 'all') {
      candidates = candidates.filter(c => c.appliedFor === oppFilter);
    }

    const status = this.statusFilter();
    if (status !== 'all') {
      candidates = candidates.filter(c => c.status === status);
    }

    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      candidates = candidates.filter(
        c => c.fullName.toLowerCase().includes(query) ||
            c.career.toLowerCase().includes(query) ||
            c.appliedFor.toLowerCase().includes(query)
      );
    }

    return candidates;
  });

  constructor() {
    setTimeout(() => this.loading.set(false), 600);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  onStatusFilterChanged(value: string): void {
    this.statusFilter.set(value);
  }

  setOpportunityFilter(value: string): void {
    this.opportunityFilter.set(value);
  }
}

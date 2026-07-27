import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import {
  PageHeaderComponent,
  SearchInputComponent,
  FilterBarComponent,
  EmptyStateComponent,
  JobCardComponent
} from '../../../../../shared/components';
import type { OpportunitySummary, FilterOption } from '../../../../../shared/models';

@Component({
  selector: 'app-opportunity-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SearchInputComponent,
    FilterBarComponent,
    EmptyStateComponent,
    JobCardComponent,
    RouterLink
  ],
  templateUrl: './opportunity-list.component.html'
})
export class OpportunityListComponent {
  private router = inject(Router);

  readonly typeFilter = signal<string>('Todas');
  readonly searchQuery = signal('');

  private readonly allOpportunities = signal<OpportunitySummary[]>([
    {
      id: 1,
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      tags: ['Angular', 'Remoto'],
      location: 'Tapachula, Chiapas, MX',
      modality: 'Remoto'
    },
    {
      id: 2,
      title: 'Beca de Desarrollador de Software',
      company: 'Fundación TalentBridge',
      tags: ['Beca', 'Inglés B2'],
      location: 'Tapachula, Chiapas, MX',
      modality: 'Presencial'
    },
    {
      id: 3,
      title: 'Practicante de QA',
      company: 'Politécnica de Tapachula',
      tags: ['Manual Testing', 'SQL', 'Automatización'],
      location: 'Tapachula, Chiapas, MX',
      modality: 'Híbrido'
    },
    {
      id: 4,
      title: 'Soporte Técnico Jr',
      company: 'Grupo Monkey',
      tags: ['Redes', 'Presencial'],
      location: 'Tapachula, Chiapas, MX',
      modality: 'Presencial'
    },
  ]);

  readonly filterOptions = computed<FilterOption[]>(() => {
    const all = this.allOpportunities();
    const vacantes = all.filter(o => !o.tags?.includes('Beca')).length;
    const becas = all.filter(o => o.tags?.includes('Beca')).length;
    return [
      { value: 'Todas', label: 'Todas', count: all.length },
      { value: 'Vacantes', label: 'Vacantes', count: vacantes },
      { value: 'Becas', label: 'Becas', count: becas }
    ];
  });

  readonly filteredOpportunities = computed(() => {
    const filter = this.typeFilter();
    const query = this.searchQuery().trim().toLowerCase();
    let opportunities = this.allOpportunities();

    if (filter === 'Vacantes') {
      opportunities = opportunities.filter((o) => !o.tags?.includes('Beca'));
    } else if (filter === 'Becas') {
      opportunities = opportunities.filter((o) => o.tags?.includes('Beca'));
    }

    if (query) {
      opportunities = opportunities.filter(
        (o) =>
          o.title.toLowerCase().includes(query) ||
          o.company.toLowerCase().includes(query)
      );
    }

    return opportunities;
  });

  onFilterChanged(filter: string): void {
    this.typeFilter.set(filter);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }
}

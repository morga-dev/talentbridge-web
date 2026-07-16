import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {
  PageHeaderComponent,
  SearchInputComponent,
  FilterBarComponent,
  EmptyStateComponent,
  JobCardComponent,
  Job
} from '../../../../../shared/components';
import type { TypeFilter } from '../../../models/student.model'; 

@Component({
  selector: 'app-opportunity-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SearchInputComponent,
    FilterBarComponent,
    EmptyStateComponent,
    JobCardComponent
  ],
  templateUrl: './opportunity-list.component.html'
})
export class OpportunityListComponent {
  private router = inject(Router);

  readonly typeFilter = signal<TypeFilter>('Todas');
  readonly searchQuery = signal('');

  // Datos de prueba
  private readonly allOpportunities = signal<Job[]>([
    {
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      tags: ['Angular', 'Remoto'],
      location: 'Tapachula, Chiapas, MX'
    },
    {
      title: 'Beca de Desarrollador de Software',
      company: 'Fundación TalentBridge',
      tags: ['Beca', 'Inglés B2'],
      location: 'Tapachula, Chiapas, MX'
    },
    {
      title: 'Practicante de QA',
      company: 'Politécnica de Tapachula',
      tags: ['Manual Testing', 'SQL', 'Automatización'],
      location: 'Tapachula, Chiapas, MX'
    },
    {
      title: 'Soporte Técnico Jr',
      company: 'Grupo Monkey',
      tags: ['Redes', 'Presencial'],
      location: 'Tapachula, Chiapas, MX'
    },
  ]);

  readonly filteredOpportunities = computed(() => {
    const filter = this.typeFilter();
    const query = this.searchQuery().trim().toLowerCase();
    let opportunities = this.allOpportunities();

    if (filter === 'Vacantes') {
      opportunities = opportunities.filter((o) => !o.tags.includes('Beca'));
    } else if (filter === 'Becas') {
      opportunities = opportunities.filter((o) => o.tags.includes('Beca'));
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
    this.typeFilter.set(filter as TypeFilter);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }
}

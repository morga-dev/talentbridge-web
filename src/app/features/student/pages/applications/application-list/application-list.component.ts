import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Application } from '../../../models';
import { ApplicationStatus, type MetricCard, type FilterOption } from '../../../../../shared/models';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent, SearchInputComponent, MetricCardsComponent, FilterBarComponent, EmptyStateComponent } from '../../../../../shared/components';


@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FilterBarComponent,
    RouterLink,
    PageHeaderComponent,
    SearchInputComponent,
    MetricCardsComponent,
	  FilterBarComponent,
	  EmptyStateComponent
  ],
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent {

  private readonly allApplications = signal<Application[]>([
    {
      id: 1,
      type: 'Vacante',
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      requirements: ['Angular', 'Tailwind', 'Git'],
      modality: 'Remoto',
      date: '10 jul 2026',
      status: 'interview'
    },
    {
      id: 2,
      type: 'Beca',
      title: 'Beca de Desarrollador de Software',
      company: 'Fundación TalentBridge',
      requirements: ['Inglés B2', 'Promedio 9.5+', 'Disponibilidad flexible'],
      modality: 'Tapachula, Chiapas, MX',
      date: '5 jul 2026',
      status: 'pending'
    },
    {
      id: 3,
      type: 'Beca',
      title: 'Practicante de QA',
      company: 'Politécnica de Tapachula',
      requirements: ['Manual Testing', 'SQL', 'Automatización'],
      modality: 'Híbrido · Tapachula, MX',
      date: '28 jun 2026',
      status: 'accepted'
    },
    {
      id: 4,
      type: 'Vacante',
      title: 'Soporte Técnico Jr',
      company: 'Grupo Monkey',
      requirements: ['Redes', 'Atención al cliente'],
      modality: 'Presencial · Tapachula, MX',
      date: '20 jun 2026',
      status: 'rejected'
    }
  ]);

  readonly typeFilter = signal<string>('Todas');

  readonly filterOptions = computed<FilterOption[]>(() => {
    const all = this.allApplications();
    const vacantes = all.filter(a => a.type === 'Vacante').length;
    const becas = all.filter(a => a.type === 'Beca').length;
    return [
      { value: 'Todas', label: 'Todas', count: all.length },
      { value: 'Vacantes', label: 'Vacantes', count: vacantes },
      { value: 'Becas', label: 'Becas', count: becas }
    ];
  });

  readonly metricItems = computed<MetricCard[]>(() => [
	  { label: 'Postulaciones', value: this.allApplications().length },
    { label: 'En entrevista', value: this.allApplications().filter((a) => a.status === 'interview').length },
    { label: 'Aceptadas', value: this.allApplications().filter((a) => a.status === 'accepted').length },
  ]);

  readonly filteredApplications = computed(() => {
    const filter = this.typeFilter();
    const applications = this.allApplications();

    if (filter === 'Vacantes') return applications.filter((a) => a.type === 'Vacante');
    if (filter === 'Becas') return applications.filter((a) => a.type === 'Beca');
    return applications;
  });

  onFilterChanged(filter: string): void {
    this.typeFilter.set(filter);
  }

  onViewDetails(application: Application): void {
    console.log('Ver detalles de:', application.title);
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

  onSearchChanged(query: string): void {
	  console.log('Buscando:', query);
  }
}

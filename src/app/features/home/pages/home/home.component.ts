import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendedSectionComponent } from '../../components/recommended-section/recommended-section.component';
import { Job } from '../../models/jobs.model';
import { PageHeaderComponent, MetricCardsComponent, FilterBarComponent, SearchInputComponent, type MetricCard } from '../../../../shared/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
	CommonModule,
	RecommendedSectionComponent,
	PageHeaderComponent,
	MetricCardsComponent,
	FilterBarComponent,
	SearchInputComponent
],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  userName = 'Morga';
  userInitials = 'DM';
  
  readonly metricItems: MetricCard[] = [
	{ label: 'Postulaciones', value: 1 },
	{ label: 'En entrevista', value: 0 },
	{ label: 'Recientes', value: 1 },
  ];

  // Datos simulados
  mockJobs: Job[] = [
    {
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      tags: ['React', 'Remoto'],
      location: 'Tapachula, MX'
    }
  ];

  onFilterSelected(filter: string): void {
    console.log('Filtrando contenido por:', filter);
    // Service
  }
  
  onSearchChanged(query: string): void {
	console.log('Buscando:', query);
  }
}

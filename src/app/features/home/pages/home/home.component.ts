import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { RecommendedSectionComponent } from '../../components/recommended-section/recommended-section.component';
import { Job } from '../../models/jobs.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterBarComponent, RecommendedSectionComponent],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  userName = 'Morga';
  userInitials = 'DM';

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
}

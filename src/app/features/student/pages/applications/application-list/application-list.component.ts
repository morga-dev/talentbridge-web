import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FilterBarComponent } from '../../../../home/components/filter-bar/filter-bar.component';
import { Application, ApplicationStatus, TypeFilter } from '../../../models/student.model';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FilterBarComponent],
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent {

  // Datos de prueba
  private readonly allApplications = signal<Application[]>([
    {
      id: 1,
      type: 'Vacante',
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      requirements: ['Angular', 'Tailwind', 'Git'],
      modality: 'Remoto',
      date: '10 jul 2026',
      status: 'entrevista'
    },
    {
      id: 2,
      type: 'Beca',
      title: 'Desarrollador de Software',
      company: 'Fundación TalentBridge',
      requirements: ['Inglés B2', 'Promedio 9.5+', 'Disponibilidad flexible'],
      modality: 'Tapachula, Chiapas, MX',
      date: '5 jul 2026',
      status: 'aplicado'
    },
    {
      id: 3,
      type: 'Beca',
      title: 'Practicante de QA',
      company: 'Politécnica de Tapachula',
      requirements: ['Manual Testing', 'SQL', 'Automatización'],
      modality: 'Híbrido · Tapachula, MX',
      date: '28 jun 2026',
      status: 'aceptada'
    },
    {
      id: 4,
      type: 'Vacante',
      title: 'Soporte Técnico Jr',
      company: 'Grupo Monkey',
      requirements: ['Redes', 'Atención al cliente'],
      modality: 'Presencial · Tapachula, MX',
      date: '20 jun 2026',
      status: 'rechazada'
    }
  ]);

  readonly typeFilter = signal<TypeFilter>('Todas');

  readonly postulacionesCount = computed(() => this.allApplications().length);
  readonly entrevistaCount = computed(
    () => this.allApplications().filter((a) => a.status === 'entrevista').length
  );
  readonly aceptadasCount = computed(
    () => this.allApplications().filter((a) => a.status === 'aceptada').length
  );

  readonly filteredApplications = computed(() => {
    const filter = this.typeFilter();
    const applications = this.allApplications();

    if (filter === 'Vacantes') return applications.filter((a) => a.type === 'Vacante');
    if (filter === 'Becas') return applications.filter((a) => a.type === 'Beca');
    return applications;
  });

  onFilterChanged(filter: string): void {
    this.typeFilter.set(filter as TypeFilter);
  }

  onViewDetails(application: Application): void {
    console.log('Ver detalles de:', application.title);
    // componente detail
  }

  statusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'aplicado':
        return 'Aplicado';
      case 'entrevista':
        return 'En entrevista';
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
    }
  }

  statusColor(status: ApplicationStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'aceptada':
        return 'primary';
      case 'entrevista':
        return 'accent';
      case 'rechazada':
        return 'warn';
      case 'aplicado':
      default:
        return undefined;
    }
  }
}

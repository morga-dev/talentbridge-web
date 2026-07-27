import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  readonly stats = [
    { label: 'Estudiantes registrados', value: '1,200+', icon: 'school' },
    { label: 'Empresas asociadas', value: '85+', icon: 'business' },
    { label: 'Vacantes publicadas', value: '340+', icon: 'work' },
    { label: 'Colocaciones exitosas', value: '180+', icon: 'handshake' }
  ];

  readonly values = [
    {
      title: 'Talento local',
      description: 'Conectamos estudiantes de la región con oportunidades reales.',
      icon: 'location_on'
    },
    {
      title: 'Transparencia',
      description: 'Procesos claros desde la postulación hasta la contratación.',
      icon: 'visibility'
    },
    {
      title: 'Crecimiento',
      description: 'Acompañamos el desarrollo profesional con recursos y mentoría.',
      icon: 'trending_up'
    },
    {
      title: 'Colaboración',
      description: 'Fomentamos alianzas entre universidades, empresas y estudiantes.',
      icon: 'groups'
    }
  ];
}

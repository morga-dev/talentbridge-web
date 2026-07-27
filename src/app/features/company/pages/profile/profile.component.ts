import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CompanyProfile } from '../../../../shared/models/company.model';
import { PageHeaderComponent } from '../../../../shared/components';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    PageHeaderComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  // Datos de prueba
  profile: CompanyProfile = {
    id: 1,
    name: 'UpTap Technologies',
    initials: 'UPT',
    industry: 'Tecnología / Software',
    about:
      'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
    sizeRange: '11-30 empleados',
    foundedYear: 2020,
    email: 'contacto@uptap.com',
    phone: 9629876543,
    website: 'https://uptap.com'
  };

  onEditProfile(): void {
    console.log('Editar perfil de empresa');
  }

  onOpenSettings(): void {
    console.log('Abrir configuración');
  }

  onOpenPrivacy(): void {
    console.log('Abrir privacidad');
  }

  onLogout(): void {
    console.log('Cerrar sesión');
  }
}

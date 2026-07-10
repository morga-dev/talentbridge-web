import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CompanyProfile } from '../../models/company.model';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  // Datos de prueba
  profile: CompanyProfile = {
    companyName: 'UpTap Technologies',
    initials: 'UPT',
    industry: 'Tecnología / Software',
    description:
      'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
    email: 'contacto@uptap.com',
    phone: 9629876543,
    website: 'https://uptap.com',
    companySize: '11-30 empleados'
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

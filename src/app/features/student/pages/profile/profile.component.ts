import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { StudentProfile } from '../../models/student.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  // Datos de prueba
  profile: StudentProfile = {
    fullName: 'Morga',
    initials: 'DM',
    career: 'Ingeniería de Software',
    university: 'Universidad Politécnica de Tapachula',
    semester: '9no semestre',
    graduationYear: '2026',
    email: 'ejemplo@uptapachula.edu.mx',
    phone: 9621234567,
    skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'],
    cvUrl: 'https://example.com/cv/morga.pdf',
    githubUrl: 'https://github.com/morga-dev',
    linkedinUrl: 'https://linkedin.com/in/morga',
    applicationsCount: 1,
    interviewsCount: 0
  };

  onEditProfile(): void {
    console.log('Editar perfil');
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
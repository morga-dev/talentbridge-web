import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  initials: string;
  badgeText: string;
  badgeType: 'recent' | 'featured';
  tags: string[];
}

@Component({
  selector: 'app-featured-opportunities',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './featured-opportunities.component.html',
  styleUrl: './featured-opportunities.component.css'
})
export class FeaturedOpportunitiesComponent {

  constructor(
    private router: Router,
  ) {}

  featuredJobs: JobOpportunity[] = [
    {
      id: '1',
      title: 'Desarrollador Frontend Jr',
      company: 'UpTap',
      location: 'Remoto · Tapachula, Chiapas',
      description: 'Buscamos un desarrollador frontend junior apasionado por la tecnología para unirse a nuestro equipo. Trabajarás con tecnologías modernas y mentores experimentados.',
      initials: 'UP',
      badgeText: 'RECIENTE',
      badgeType: 'recent',
      tags: ['ANGULAR', 'TYPE SCRIPT', 'GIT']
    },
    {
      id: '3',
      title: 'Practicante de QA',
      company: 'Politécnica de Tapachula',
      location: 'Híbrido · Tapachula, Chiapas',
      description: 'Buscamos un practicante de QA para asegurar la calidad de nuestras aplicaciones. Aprenderás sobre pruebas manuales y automatizadas con la guía de nuestro equipo.',
      initials: 'PT',
      badgeText: 'DESTACADO',
      badgeType: 'featured',
      tags: ['MANUAL TESTING', 'SQL']
    },
    {
      id: '2',
      title: 'Beca de Desarrollador de Software',
      company: 'Fundación TalentBridge',
      location: 'Presencial · Tapachula, Chiapas',
      description: 'Programa de beca para estudiantes interesados en iniciar su carrera en desarrollo de software. Recibirás capacitación teórica y práctica con proyectos reales.',
      initials: 'TB',
      badgeText: 'RECIENTE',
      badgeType: 'recent',
      tags: ['JAVA SCRIPT', 'GIT']
    }
  ];

  viewAllJobs(): void {
    this.router.navigate(['auth/login']);
  }
}

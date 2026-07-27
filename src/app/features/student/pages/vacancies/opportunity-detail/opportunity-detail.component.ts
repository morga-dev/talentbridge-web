import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  EmptyStateComponent,
  LoadingSkeletonComponent,
} from '../../../../../shared/components';
import type { OpportunityDetail, OpportunitySummary } from '../../../../../shared/models';

@Component({
  selector: 'app-opportunity-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    EmptyStateComponent,
    LoadingSkeletonComponent
  ],
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly id = input<string>();

  readonly loading = signal(true);
  readonly opportunity = signal<OpportunityDetail | null>(null);
  readonly similarOpportunities = signal<OpportunitySummary[]>([]);
  readonly isSaved = signal(false);

  readonly publishedLabel = computed(() => {
    const job = this.opportunity();
    return job ? this.formatPublished(job.createdAt) : '';
  });

  ngOnInit(): void {
    const currentId = this.id();
    this.fetchOpportunity(currentId ?? null);
  }

  toggleSave(): void {
    this.isSaved.update((v) => !v);
  }

  onApply(): void {
    // Lógica de postulación
  }

  onShare(): void {
    const job = this.opportunity();
    if (!job) return;

    if (navigator.share) {
      navigator.share({ title: job.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  private fetchOpportunity(id: string | null): void {
    this.loading.set(true);

    // Cancelamos el temporizador si el componente es destruido mientras carga
    const timer = setTimeout(() => {
      this.opportunity.set({
        id: Number(id) || 1,
        company: {
          id: 1,
          name: 'UpTap',
          industry: 'Software',
          phone: 9629876543,
          email: 'contacto@uptap.com',
          about: 'Líderes en soluciones tecnológicas',
          sizeRange: '50 - 100 empleados',
          foundedYear: 2018
        },
        title: 'Senior Frontend Engineer',
        description:
          'Estamos buscando un Senior Frontend Engineer apasionado por crear interfaces excepcionales y arquitecturas escalables. En TalentBridge, creemos en empoderar a la próxima generación de talento tecnológico.\n Trabajarás estrechamente con diseñadores de producto y desarrolladores backend implementando nuevas funcionalidades con React, Tailwind CSS y Node.js.',
        requirements: [
          '+1 año de experiencia trabajando con React y ecosistemas modernos de JavaScript.',
          'Sólidos conocimientos en CSS avanzado y frameworks como Tailwind o Styled Components.',
          'Experiencia previa liderando técnicamente proyectos o mentorizando perfiles junior.',
          'Mentalidad orientada a producto y atención al detalle en la UI/UX.'
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Git'],
        location: 'Tapachula, Chiapas, MX',
        modality: 'Remoto',
        salaryRange: '$100,000 MXN - $200,000 MXN / año',
        employmentType: 'Tiempo completo',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expirationDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        estimatedApplyMinutes: 5
      });

      this.similarOpportunities.set([
        { id: 2, title: 'Fullstack Developer', company: 'TechCorp', tags: [], location: 'Remoto', modality: 'Híbrido', salaryRange: '€50k - €65k' },
        { id: 3, title: 'Frontend Lead', company: 'TechCorp', tags: [], location: 'Remoto', modality: 'Remoto', salaryRange: '€70k - €90k' }
      ]);

      this.loading.set(false);
    }, 400);

    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }

  private formatPublished(dateIso: string): string {
    const days = Math.floor((Date.now() - new Date(dateIso).getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Publicada hoy';
    if (days === 1) return 'Publicada hace 1 día';
    return `Publicada hace ${days} días`;
  }
}
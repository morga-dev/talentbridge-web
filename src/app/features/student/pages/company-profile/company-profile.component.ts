import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  PageHeaderComponent,
  LoadingSkeletonComponent,
  EmptyStateComponent,
  JobCardComponent
} from '../../../../shared/components';
import { OpportunitySummary } from '../../../../shared/models';
import { CompanyPreview } from '../../../../shared/models';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    PageHeaderComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    JobCardComponent
  ],
  templateUrl: './company-profile.component.html'
})
export class CompanyProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly loading = signal(true);
  readonly notFound = signal(false);
  readonly company = signal<CompanyPreview | null>(null);
  readonly activeJobs = signal<OpportunitySummary[]>([]);

  readonly initials = computed(() => {
    const name = this.company()?.name;
    if (!name) return '';
    return name
      .split(' ')
      .filter(Boolean)
      .map((w: string) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchCompany(id);
  }

  goBack(): void {
    this.location.back();
  }

  private fetchCompany(id: string | null): void {
    this.loading.set(true);

    setTimeout(() => {
      if (id === '1') {
        this.company.set({
          id: 1,
          name: 'UpTap Technologies',
          logoUrl: undefined,
          industry: 'Tecnología / Software',
          email: 'contacto@uptap.com',
          phone: 9621234567,
          about: 'Empresa dedicada al desarrollo de soluciones digitales para conectar talento joven con oportunidades laborales reales en Tapachula.',
          sizeRange: '11-30 empleados',
          foundedYear: 2020,
          website: 'https://uptap.com'
        });
        this.activeJobs.set([
          {
            id: 1,
            title: 'Senior Frontend Engineer',
            company: 'TechCorp',
            tags: ['React', 'TypeScript', 'Remoto'],
            location: 'Madrid, España',
            modality: 'Remoto',
            salaryRange: '€55k - €75k / año',
            employmentType: 'Tiempo completo'
          }
        ]);
        this.notFound.set(false);
      } else {
        this.notFound.set(true);
      }
      this.loading.set(false);
    }, 400);
  }
}

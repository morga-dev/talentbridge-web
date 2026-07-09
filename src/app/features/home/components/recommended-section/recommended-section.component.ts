import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../job-card/job-card.component';
import { Job } from '../../models/jobs.model';

@Component({
  selector: 'app-recommended-section',
  standalone: true,
  imports: [
    CommonModule,
    JobCardComponent
  ],
  templateUrl: './recommended-section.component.html'
})

export class RecommendedSectionComponent {
  @Input() jobs: Job[] = [];
}

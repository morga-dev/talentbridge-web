import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../models/jobs.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './job-card.component.html'
})

export class JobCardComponent {
  @Input({ required: true }) job!: Job;
}

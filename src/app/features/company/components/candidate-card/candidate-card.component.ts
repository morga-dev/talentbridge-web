import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CandidateApplicant } from '../../../../shared/models/company.model';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './candidate-card.component.html'
})

export class CandidateCardComponent {
  @Input({ required: true }) candidate!: CandidateApplicant;

  statusLabel(): string {
    switch (this.candidate.status) {
      case 'pending': return 'Nuevo';
      case 'reviewing': return 'En revisión';
      case 'interview': return 'En entrevista';
      case 'accepted': return 'Aceptado';
      case 'rejected': return 'Rechazado';
    }
  }

  statusColor(): 'primary' | 'accent' | 'warn' | undefined {
    switch (this.candidate.status) {
      case 'accepted': return 'primary';
      case 'interview': return 'accent';
      case 'rejected': return 'warn';
      default: return undefined;
    }
  }
}

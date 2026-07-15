import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CandidateApplicant } from '../../models/company.model';

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
      case 'aplicado': return 'Nuevo';
      case 'entrevista': return 'En entrevista';
      case 'aceptada': return 'Aceptado';
      case 'rechazada': return 'Rechazado';
    }
  }

  statusColor(): 'primary' | 'accent' | 'warn' | undefined {
    switch (this.candidate.status) {
      case 'aceptada': return 'primary';
      case 'entrevista': return 'accent';
      case 'rechazada': return 'warn';
      default: return undefined;
    }
  }
}

import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  // Configuración de ícono e información
  readonly icon = input<string>('info');
  readonly message = input<string>();
  readonly title = input<string>();
  readonly description = input<string>();

  // Botón de acción opcional
  readonly actionLabel = input<string>();
  readonly action = output<void>();

  onAction(): void {
    this.action.emit();
  }
}

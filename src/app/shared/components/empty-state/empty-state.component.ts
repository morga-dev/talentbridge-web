import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  
  readonly message = input.required<string>();
	readonly icon = input('info');

}

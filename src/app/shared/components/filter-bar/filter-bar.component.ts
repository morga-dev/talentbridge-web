import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-bar',
	standalone: true,
	imports: [
		MatButtonModule
	],
	templateUrl: './filter-bar.component.html',
})

export class FilterBarComponent {
	readonly filters = input<string[]>(['Todas', 'Vacantes', 'Becas']);
	readonly selected = input('Todas');
	readonly filterChanged = output<string>();

	selectFilter(filter: string): void {
		this.filterChanged.emit(filter);
	}
}

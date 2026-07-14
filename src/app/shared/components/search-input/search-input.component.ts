import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
	standalone: true,
	imports: [
    FormsModule
  ],
	templateUrl: './search-input.component.html',
})

export class SearchInputComponent {
	readonly placeholder = input('Buscar...');
	readonly value = input('');
	readonly valueChange = output<string>();

	onInput(value: string): void {
		this.valueChange.emit(value);
	}
}

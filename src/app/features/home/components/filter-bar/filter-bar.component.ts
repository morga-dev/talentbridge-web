import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './filter-bar.component.html'
})

export class FilterBarComponent {
  @Output() filterChanged = new EventEmitter<string>();

  filters = ['Todas', 'Vacantes', 'Becas'];
  selectedFilter = 'Todas';

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
    this.filterChanged.emit(filter);
  }
}

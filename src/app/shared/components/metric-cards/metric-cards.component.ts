import { Component, input } from '@angular/core';
import { MetricCard } from '../../models/metric-cards.model';

@Component({
  selector: 'app-metric-cards',
	standalone: true,
	imports: [],
	templateUrl: './metric-cards.component.html',
})

export class MetricCardsComponent {
  readonly items = input<MetricCard[]>([]);
}

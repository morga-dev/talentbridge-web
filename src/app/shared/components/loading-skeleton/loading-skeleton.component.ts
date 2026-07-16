import { Component, computed, input } from '@angular/core';
import { SkeletonVariant } from '../../models/skeleton.model';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './loading-skeleton.component.html',
})
export class LoadingSkeletonComponent {

  readonly variant = input<SkeletonVariant>('card');
  readonly count = input(3);

  readonly items = computed(() => Array.from({ length: this.count() }));
}

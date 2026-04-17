import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface LegendItem {
  label: string;
  colorClass: string;
  borderClass: string;
}

@Component({
  selector: 'cl-category-legend',
  templateUrl: './category-legend.html',
  styleUrl: './category-legend.scss',
  imports: [TranslatePipe]
})
export class CategoryLegend {
  readonly categories: LegendItem[] = [
    { label: 'CATEGORY.REACTIVE_NONMETALS', colorClass: 'bg-primary/20', borderClass: 'border-primary' },
    { label: 'CATEGORY.NOBLE_GASES', colorClass: 'bg-secondary/20', borderClass: 'border-secondary' },
    { label: 'CATEGORY.ALKALI_METALS', colorClass: 'bg-tertiary/20', borderClass: 'border-tertiary' },
    { label: 'CATEGORY.ALKALINE_EARTH', colorClass: 'bg-error/20', borderClass: 'border-error' },
    { label: 'CATEGORY.METALLOIDS', colorClass: 'bg-primary-dim/20', borderClass: 'border-primary-dim' },
    { label: 'CATEGORY.TRANSITION_METALS', colorClass: 'bg-outline/20', borderClass: 'border-outline' },
    { label: 'CATEGORY.POST_TRANSITION', colorClass: 'bg-on-surface-variant/20', borderClass: 'border-on-surface-variant' },
    { label: 'CATEGORY.LANTHANIDES', colorClass: 'bg-secondary-fixed-dim/20', borderClass: 'border-secondary-fixed-dim' },
    { label: 'CATEGORY.ACTINIDES', colorClass: 'bg-on-error-container/20', borderClass: 'border-on-error-container' },
  ];
}

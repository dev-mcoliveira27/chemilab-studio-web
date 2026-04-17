import { Component, input, computed } from '@angular/core';
import { ChemicalElement } from '../../models/element.model';
import { ShellConfigChart } from '../shell-config-chart/shell-config-chart';
import { AtomModel } from '../atom-model/atom-model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'cl-element-detail-panel',
  templateUrl: './element-detail-panel.html',
  styleUrl: './element-detail-panel.scss',
  imports: [ShellConfigChart, AtomModel, TranslatePipe],
})
export class ElementDetailPanel {
  element = input<ChemicalElement | null>(null);

  displayMeltingPoint = computed(() => {
    const el = this.element();
    if (!el || el.meltingPoint === null) return 'N/A';
    return `${el.meltingPoint.toLocaleString()} °C`;
  });

  displayBoilingPoint = computed(() => {
    const el = this.element();
    if (!el || el.boilingPoint === null) return 'N/A';
    return `${el.boilingPoint.toLocaleString()} °C`;
  });

  displayWeight = computed(() => {
    const el = this.element();
    if (!el) return 'N/A';
    return `${el.atomicWeight} u`;
  });
}

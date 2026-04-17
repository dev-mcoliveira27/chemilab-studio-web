import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'cl-shell-config-chart',
  templateUrl: './shell-config-chart.html',
  styleUrl: './shell-config-chart.scss',
})
export class ShellConfigChart {
  shells = input<number[]>([]);

  /** Compute bar heights as percentage of the max shell value */
  bars = computed(() => {
    const s = this.shells();
    if (!s.length) return [];
    const max = Math.max(...s);
    return s.map((value) => ({
      value,
      heightPercent: max > 0 ? (value / max) * 100 : 0,
    }));
  });
}

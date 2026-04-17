import { Component, input, output, computed } from '@angular/core';
import { ChemicalElement } from '../../models/element.model';
import { ElementCell } from '../element-cell/element-cell';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'cl-periodic-table-grid',
  templateUrl: './periodic-table-grid.html',
  styleUrl: './periodic-table-grid.scss',
  imports: [ElementCell, TranslatePipe],
})
export class PeriodicTableGrid {
  elements = input.required<ChemicalElement[]>();
  selectedElement = input<ChemicalElement | null>(null);
  elementSelected = output<ChemicalElement>();

  /** Elements for the main 7-row table (excluding lanthanides/actinides) */
  mainElements = computed(() =>
    this.elements().filter((el) => el.gridRow >= 1 && el.gridRow <= 7)
  );

  /** Lanthanide series (row 9) */
  lanthanides = computed(() =>
    this.elements()
      .filter((el) => el.gridRow === 9)
      .sort((a, b) => a.gridCol - b.gridCol)
  );

  /** Actinide series (row 10) */
  actinides = computed(() =>
    this.elements()
      .filter((el) => el.gridRow === 10)
      .sort((a, b) => a.gridCol - b.gridCol)
  );

  getGridStyles(element: ChemicalElement): Record<string, string> {
    return {
      'grid-column': `${element.gridCol}`,
      'grid-row': `${element.gridRow}`,
    };
  }

  isSelected(element: ChemicalElement): boolean {
    return this.selectedElement()?.number === element.number;
  }

  onElementClick(element: ChemicalElement): void {
    this.elementSelected.emit(element);
  }
}

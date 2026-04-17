import { Component, input, output } from '@angular/core';
import { ChemicalElement } from '../../models/element.model';

@Component({
  selector: 'cl-element-cell',
  templateUrl: './element-cell.html',
  styleUrl: './element-cell.scss',
})
export class ElementCell {
  element = input.required<ChemicalElement>();
  isSelected = input(false);
  elementClick = output<ChemicalElement>();

  onClick(): void {
    this.elementClick.emit(this.element());
  }
}

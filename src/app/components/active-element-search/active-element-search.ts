import { Component, input, output } from '@angular/core';
import { ChemicalElement } from '../../models/element.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'cl-active-element-search',
  templateUrl: './active-element-search.html',
  styleUrl: './active-element-search.scss',
  imports: [TranslatePipe]
})
export class ActiveElementSearch {
  activeElement = input<ChemicalElement | null>(null);
  searchClick = output<void>();
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ElementService } from '../../services/element.service';
import { ChemicalElement } from '../../models/element.model';
import { PageHeader } from '../../components/page-header/page-header';
import { ActiveElementSearch } from '../../components/active-element-search/active-element-search';
import { PeriodicTableGrid } from '../../components/periodic-table-grid/periodic-table-grid';
import { ElementDetailPanel } from '../../components/element-detail-panel/element-detail-panel';
import { CategoryLegend } from '../../components/category-legend/category-legend';

@Component({
  selector: 'cl-periodic-table-page',
  templateUrl: './periodic-table.page.html',
  styleUrl: './periodic-table.page.scss',
  imports: [PageHeader, ActiveElementSearch, PeriodicTableGrid, ElementDetailPanel, CategoryLegend],
})
export class PeriodicTablePage implements OnInit {
  private readonly elementService = inject(ElementService);

  elements = signal<ChemicalElement[]>([]);
  selectedElement = signal<ChemicalElement | null>(null);

  ngOnInit(): void {
    this.elementService.getAll().subscribe((data) => {
      this.elements.set(data);
    });
  }

  onElementSelected(element: ChemicalElement): void {
    this.selectedElement.set(element);
  }
}

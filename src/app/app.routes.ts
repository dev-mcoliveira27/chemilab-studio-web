import { Routes } from '@angular/router';
import { PeriodicTablePage } from './pages/periodic-table/periodic-table.page';

export const routes: Routes = [
  { path: '', component: PeriodicTablePage },
  { path: '**', redirectTo: '' },
];

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChemicalElement } from '../models/element.model';
import { I18nService } from './i18n.service';

@Injectable({ providedIn: 'root' })
export class ElementService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);

  /** Cached elements observable — shared across subscribers, updates on language change */
  private readonly elements$: Observable<ChemicalElement[]> = toObservable(this.i18n.currentLang).pipe(
    switchMap(lang => this.http.get<ChemicalElement[]>(`/data/elements_${lang}.json`)),
    shareReplay(1)
  );

  /** Returns all 118 elements */
  getAll(): Observable<ChemicalElement[]> {
    return this.elements$;
  }

  /** Returns a single element by atomic number */
  getElementById(atomicNumber: number): Observable<ChemicalElement | undefined> {
    return this.elements$.pipe(
      map((elements) => elements.find((el) => el.number === atomicNumber))
    );
  }

  /** Returns elements filtered by category */
  getElementsByCategory(category: string): Observable<ChemicalElement[]> {
    return this.elements$.pipe(
      map((elements) => elements.filter((el) => el.category === category))
    );
  }

  /** Returns elements for the main table grid (rows 1-7) */
  getMainTableElements(): Observable<ChemicalElement[]> {
    return this.elements$.pipe(
      map((elements) => elements.filter((el) => el.gridRow >= 1 && el.gridRow <= 7))
    );
  }

  /** Returns lanthanide series elements (row 9) */
  getLanthanides(): Observable<ChemicalElement[]> {
    return this.elements$.pipe(
      map((elements) => elements.filter((el) => el.gridRow === 9))
    );
  }

  /** Returns actinide series elements (row 10) */
  getActinides(): Observable<ChemicalElement[]> {
    return this.elements$.pipe(
      map((elements) => elements.filter((el) => el.gridRow === 10))
    );
  }
}

import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type LanguageCode = 'pt-BR' | 'en-US' | 'es';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private http = inject(HttpClient);
  
  // Available languages
  readonly languages = [
    { code: 'pt-BR' as LanguageCode, label: 'Português (BRASIL)' },
    { code: 'en-US' as LanguageCode, label: 'English (USA)' },
    { code: 'es' as LanguageCode, label: 'Español' }
  ];

  // Current selected language
  readonly currentLang = signal<LanguageCode>('pt-BR');

  // Loaded translations for the current language
  readonly translations = signal<Record<string, any>>({});

  constructor() {
    this.loadTranslations(this.currentLang());
    
    // Load new translations whenever language changes
    effect(() => {
      this.loadTranslations(this.currentLang());
    });
  }

  setLanguage(code: LanguageCode) {
    this.currentLang.set(code);
    // Maybe persist to localStorage here
  }

  private async loadTranslations(code: LanguageCode) {
    try {
      const data = await firstValueFrom(this.http.get<Record<string, any>>(`/i18n/${code}.json`));
      this.translations.set(data);
    } catch (e) {
      console.error(`Failed to load translations for ${code}`, e);
    }
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations();
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // return the key itself if not found
      }
    }
    return result as string;
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService, LanguageCode } from '../../services/i18n.service';

@Component({
  selector: 'cl-sidenav',
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
})
export class Sidenav {
  i18n = inject(I18nService);

  onLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.i18n.setLanguage(select.value as LanguageCode);
  }
}

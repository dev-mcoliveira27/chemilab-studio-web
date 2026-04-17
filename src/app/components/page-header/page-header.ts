import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'cl-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  imports: [TranslatePipe],
})
export class PageHeader {}

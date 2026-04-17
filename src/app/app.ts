import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from './layout/sidenav/sidenav';

@Component({
  selector: 'cl-root',
  imports: [RouterOutlet, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

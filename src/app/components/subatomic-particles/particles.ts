import { Component } from '@angular/core';

@Component({
  selector: 'cl-proton',
  template: `<div class="w-[7px] h-[7px] rounded-full bg-error shadow-[0_0_6px_rgba(255,84,73,0.8)] border-[0.5px] border-white/40 absolute -translate-x-1/2 -translate-y-1/2"></div>`,
})
export class ProtonComponent {}

@Component({
  selector: 'cl-neutron',
  template: `<div class="w-[7px] h-[7px] rounded-full bg-outline-variant shadow-[0_0_6px_rgba(141,146,154,0.6)] border-[0.5px] border-white/20 absolute -translate-x-1/2 -translate-y-1/2"></div>`,
})
export class NeutronComponent {}

@Component({
  selector: 'cl-electron',
  template: `<div class="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,227,253,1)] absolute -translate-x-1/2 -translate-y-1/2"></div>`,
})
export class ElectronComponent {}

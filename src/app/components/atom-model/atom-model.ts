import { Component, input, computed } from '@angular/core';
import { ChemicalElement } from '../../models/element.model';
import { ProtonComponent, NeutronComponent, ElectronComponent } from '../subatomic-particles/particles';

interface ParticlePos {
  x: number;
  y: number;
}

interface ShellData {
  size: number;
  electrons: { angle: number }[];
  speed: number;
  zIndex: number;
}

@Component({
  selector: 'cl-atom-model',
  templateUrl: './atom-model.html',
  styleUrl: './atom-model.scss',
  imports: [ProtonComponent, NeutronComponent, ElectronComponent]
})
export class AtomModel {
  element = input.required<ChemicalElement>();

  atomScale = computed(() => {
    const numShells = this.element().electronShells?.length || 1;
    // 1 shell -> scale 1.8
    // 7 shells -> scale 0.8
    return 1.8 - ((numShells - 1) / 6) * 1.0;
  });

  protons = computed(() => {
    const count = this.element().number;
    return this.generateNucleusParticles(count);
  });

  neutrons = computed(() => {
    const el = this.element();
    let count = Math.round(el.atomicWeight) - el.number;
    if (count < 0 || isNaN(count)) count = 0;
    return this.generateNucleusParticles(count);
  });

  shells = computed(() => {
    const shells = this.element().electronShells || [];
    const shellData: ShellData[] = [];
    const baseSize = 80; // Inner shell diameter
    const shellGap = 40; // Gap between shells

    shells.forEach((electronCount, index) => {
      const size = baseSize + index * shellGap;
      const speed = 7 + index * 3; // Outer shells spin slightly slower
      const zIndex = 10 - index;
      
      const electrons = [];
      const angleStep = 360 / electronCount;
      for (let i = 0; i < electronCount; i++) {
        electrons.push({
          angle: i * angleStep
        });
      }

      shellData.push({ size, electrons, speed, zIndex });
    });

    return shellData;
  });

  private generateNucleusParticles(count: number): ParticlePos[] {
    const positions: ParticlePos[] = [];
    // Dynamic radius based on number of particles (fits inside the 80px inner shell)
    const maxRadius = Math.min(5 + Math.sqrt(count) * 1.6, 32); 
    
    for (let i = 0; i < count; i++) {
      // Math.sqrt(Math.random()) ensures uniform distribution inside the circle
      const r = maxRadius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      positions.push({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
      });
    }
    return positions;
  }
}

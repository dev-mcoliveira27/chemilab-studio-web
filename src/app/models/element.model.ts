export type ElementCategory =
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  category: ElementCategory;
  atomicWeight: number;
  meltingPoint: number | null;
  boilingPoint: number | null;
  electronShells: number[];
  description: string;
  gridRow: number;
  gridCol: number;
}

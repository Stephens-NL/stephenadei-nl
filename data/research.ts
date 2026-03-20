export interface Thesis { key: string; file?: string; }
export const theses: Thesis[] = [
  { key: 'masters', file: 'entanglement-assisted-communication.pdf' },
  { key: 'teaching' },
  { key: 'bachelors', file: 'mathematical-epidemiology.pdf' },
  { key: 'biomath', file: 'stability-enzymatic-reaction-chains.pdf' },
];

export interface Education { key: string; }
export const education: Education[] = [
  { key: 'msc' },
  { key: 'ilo' },
  { key: 'bsc' },
];

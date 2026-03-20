export interface ServiceCard {
  key: string;
  iconName: 'GraduationCap' | 'Database' | 'Camera' | 'Music';
  url: string;
  isLive: boolean;
}

export const serviceCards: ServiceCard[] = [
  { key: 'privateTutoring', iconName: 'GraduationCap', url: 'https://stephensprivelessen.nl', isLive: true },
  { key: 'dataConsultancy', iconName: 'Database', url: 'https://data.stephenadei.nl', isLive: true },
  { key: 'photography', iconName: 'Camera', url: 'https://photography.stephenadei.nl', isLive: false },
  { key: 'music', iconName: 'Music', url: 'https://music.stephenadei.nl', isLive: false },
];

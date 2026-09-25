export interface ThemeColors {
  background: string;
  surface: string;
  elevatedSurface: string;
  text: string;
  secondaryText: string;
  tertiaryText: string;
  border: string;
  cardBorder: string;
  inputBackground: string;
  badgeBackground: string;
  accent: string;
  accentGradient: [string, string, ...string[]];
  storyGradient: [string, string, string];
  heartRed: string;
  tabActive: string;
  tabInactive: string;
  divider: string;
}

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  elevatedSurface: '#F7F8FC',
  text: '#11121C',
  secondaryText: '#828799',
  tertiaryText: '#A1A6B6',
  border: 'rgba(0, 0, 0, 0.07)',
  cardBorder: 'rgba(0, 0, 0, 0.05)',
  inputBackground: '#F0F2F7',
  badgeBackground: '#FF2E63',
  accent: '#E6007A',
  accentGradient: ['#FF0A78', '#A811DA', '#7928CA'],
  storyGradient: ['#FF3366', '#C026D3', '#7928CA'],
  heartRed: '#FF2A55',
  tabActive: '#12131D',
  tabInactive: '#A4A8B7',
  divider: '#EEF0F5',
};

export const darkColors: ThemeColors = {
  background: '#0B0C13',
  surface: '#121420',
  elevatedSurface: '#191C2D',
  text: '#FFFFFF',
  secondaryText: '#878C9E',
  tertiaryText: '#595E72',
  border: 'rgba(255, 255, 255, 0.08)',
  cardBorder: 'rgba(255, 255, 255, 0.06)',
  inputBackground: '#181A28',
  badgeBackground: '#FF2E63',
  accent: '#FF0A78',
  accentGradient: ['#FF0A78', '#991BEA', '#6366F1'],
  storyGradient: ['#FF2D55', '#B026FF', '#6B11FF'],
  heartRed: '#FF2A55',
  tabActive: '#FFFFFF',
  tabInactive: '#636779',
  divider: '#1A1C28',
};

export const shadowGradients = {
  mainFeed: ['#4E137D', '#791DA6', '#C724B1', '#FF3B8A'],
  softPastel: ['#7A58E6', '#B77DE8', '#F5A7C4', '#FCD5B5'],
  deepMoody: ['#232A3B', '#161B26', '#0F131D'],
  tealCyan: ['#0A3A40', '#0E626B', '#13928E', '#20C997'],
  warmBronze: ['#3A2C27', '#5C3E33', '#855E4E'],
  categoryTV: ['#7928CA', '#A855F7'],
  categoryShop: ['#EC4899', '#F43F5E'],
  categoryTravel: ['#06B6D4', '#3B82F6'],
  categoryFitness: ['#F97316', '#FB7185'],
};

export const themeRadius = {
  sm: 8,
  md: 14,
  lg: 20,
  card: 26,
  full: 9999,
};

export const themeSpacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
};

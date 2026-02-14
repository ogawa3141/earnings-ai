export const colors = {
  background: '#131A2A',
  backgroundSecondary: '#182035',
  card: '#1C2640',
  cardHover: '#233050',
  accent: '#6C9FFF',
  accentSecondary: '#A78BFA',
  positive: '#34D399',
  positiveBackground: 'rgba(52, 211, 153, 0.12)',
  negative: '#F87171',
  negativeBackground: 'rgba(248, 113, 113, 0.12)',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  border: '#2A3650',
  borderLight: '#3D4F6A',
  surface: '#243352',
  surfaceHover: '#2E3F60',
  overlay: 'rgba(0, 0, 0, 0.5)',
  // Gradient pairs
  gradientAccent: ['#6C9FFF', '#A78BFA'] as const,
  gradientPositive: ['#34D399', '#6EE7B7'] as const,
  gradientNegative: ['#F87171', '#FCA5A5'] as const,
  gradientCard: ['rgba(28, 38, 64, 0.9)', 'rgba(36, 51, 82, 0.5)'] as const,
  gradientBackground: ['#131A2A', '#182035', '#1C2640'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 20,
  xl: 26,
  xxl: 34,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export const opacity = {
  glass: 0.08,
  glassBorder: 0.15,
  disabled: 0.4,
  hover: 0.7,
  pressed: 0.85,
};

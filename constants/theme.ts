export const colors = {
  background: '#F8F9FB',
  backgroundSecondary: '#FFFFFF',
  card: '#FFFFFF',
  cardHover: '#F1F3F7',
  accent: '#4A7CFF',
  accentSecondary: '#7C5CFC',
  positive: '#16A34A',
  positiveBackground: 'rgba(22, 163, 74, 0.08)',
  negative: '#DC2626',
  negativeBackground: 'rgba(220, 38, 38, 0.08)',
  text: '#1A1D26',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  surface: '#F1F3F7',
  surfaceHover: '#E8EBF0',
  overlay: 'rgba(0, 0, 0, 0.3)',
  // Gradient pairs
  gradientAccent: ['#4A7CFF', '#7C5CFC'] as const,
  gradientPositive: ['#16A34A', '#22C55E'] as const,
  gradientNegative: ['#DC2626', '#EF4444'] as const,
  gradientCard: ['rgba(255, 255, 255, 0.9)', 'rgba(241, 243, 247, 0.5)'] as const,
  gradientBackground: ['#F8F9FB', '#FFFFFF', '#F1F3F7'] as const,
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
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
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

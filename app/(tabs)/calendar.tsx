import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, fontSize } from '../../constants/theme';

const mockCalendar = [
  { date: '2026-02-13 (木)', tickers: ['AMAT', 'MRNA', 'MGA', 'AAP', 'ENB'] },
  { date: '2026-02-18 (火)', tickers: ['SHOP', 'MDT', 'PANW'] },
  { date: '2026-02-19 (水)', tickers: ['NVDA', 'SNOW', 'ETSY'] },
  { date: '2026-02-20 (木)', tickers: ['WMT', 'BKNG', 'MRCY'] },
  { date: '2026-02-25 (火)', tickers: ['HD', 'INTU', 'TJX'] },
  { date: '2026-02-26 (水)', tickers: ['CRM', 'OKTA', 'ZS'] },
];

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>決算カレンダー</Text>
      <Text style={styles.subtitle}>2026年2月</Text>

      {mockCalendar.map((day) => (
        <View key={day.date} style={styles.dayCard}>
          <Text style={styles.dayDate}>{day.date}</Text>
          <View style={styles.tickerRow}>
            {day.tickers.map((t) => (
              <View key={t} style={styles.tickerBadge}>
                <Text style={styles.tickerText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.md, marginTop: spacing.xs, marginBottom: spacing.lg },
  dayCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  dayDate: { color: colors.text, fontSize: fontSize.md, fontWeight: '600', marginBottom: spacing.sm },
  tickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tickerBadge: {
    backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    borderRadius: 6, borderWidth: 1, borderColor: colors.border,
  },
  tickerText: { color: colors.accent, fontSize: fontSize.sm, fontWeight: '600' },
});

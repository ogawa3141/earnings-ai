import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';

const mockCalendar = [
  { date: '2026-02-13 (木)', day: 13, tickers: ['AMAT', 'MRNA', 'MGA', 'AAP', 'ENB'] },
  { date: '2026-02-18 (火)', day: 18, tickers: ['SHOP', 'MDT', 'PANW'] },
  { date: '2026-02-19 (水)', day: 19, tickers: ['NVDA', 'SNOW', 'ETSY'] },
  { date: '2026-02-20 (木)', day: 20, tickers: ['WMT', 'BKNG', 'MRCY'] },
  { date: '2026-02-25 (火)', day: 25, tickers: ['HD', 'INTU', 'TJX'] },
  { date: '2026-02-26 (水)', day: 26, tickers: ['CRM', 'OKTA', 'ZS'] },
];

const earningsDays = new Set(mockCalendar.map((d) => d.day));
const today = 14;
const daysInFeb = 28;
const firstDayOffset = 6; // Feb 1, 2026 = Sunday (offset 6 for Mon-start)
const dayLabels = ['月', '火', '水', '木', '金', '土', '日'];

const tickerColors: Record<string, string> = {
  AMAT: '#6C9FFF', MRNA: '#34D399', MGA: '#F87171', AAP: '#F87171',
  ENB: '#34D399', SHOP: '#A78BFA', MDT: '#6C9FFF', PANW: '#A78BFA',
  NVDA: '#34D399', SNOW: '#6C9FFF', ETSY: '#F59E0B', WMT: '#34D399',
  BKNG: '#6C9FFF', MRCY: '#A78BFA', HD: '#F59E0B', INTU: '#6C9FFF',
  TJX: '#34D399', CRM: '#6C9FFF', OKTA: '#A78BFA', ZS: '#34D399',
};

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) calendarCells.push(null);
  for (let i = 1; i <= daysInFeb; i++) calendarCells.push(i);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>決算カレンダー</Text>
      <Text style={styles.subtitle}>2026年2月</Text>

      {/* Mini Calendar Grid */}
      <View style={styles.calendarGrid}>
        {dayLabels.map((d) => (
          <View key={d} style={styles.calendarHeaderCell}>
            <Text style={styles.calendarHeaderText}>{d}</Text>
          </View>
        ))}
        {calendarCells.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.calendarCell,
              day === today && styles.calendarToday,
              day !== null && earningsDays.has(day) && styles.calendarEarnings,
              day === selectedDay && styles.calendarSelected,
            ]}
            onPress={() => day && setSelectedDay(day === selectedDay ? null : day)}
            disabled={day === null}
          >
            {day !== null ? (
              <>
                <Text style={[
                  styles.calendarDayText,
                  day === today && styles.calendarTodayText,
                  day === selectedDay && styles.calendarSelectedText,
                ]}>
                  {day}
                </Text>
                {earningsDays.has(day) && (
                  <View style={styles.earningsDot} />
                )}
              </>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>

      {/* Timeline */}
      {mockCalendar.map((day, index) => (
        <View key={day.date} style={styles.timelineItem}>
          {/* Vertical line */}
          <View style={styles.timelineLine}>
            <View style={[
              styles.timelineDot,
              day.day === today && { backgroundColor: colors.accent },
            ]} />
            {index < mockCalendar.length - 1 && <View style={styles.timelineConnector} />}
          </View>

          <View style={[styles.dayCard, day.day === today && styles.dayCardToday]}>
            <View style={styles.dayDateRow}>
              <Text style={styles.dayDate}>{day.date}</Text>
              {day.day === today && (
                <View style={styles.todayBadge}>
                  <Text style={styles.todayBadgeText}>今日</Text>
                </View>
              )}
            </View>
            <View style={styles.tickerRow}>
              {day.tickers.map((t) => (
                <View key={t} style={[styles.tickerBadge, { borderColor: tickerColors[t] || colors.accent }]}>
                  <Text style={[styles.tickerText, { color: tickerColors[t] || colors.accent }]}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.md, marginTop: spacing.xs, marginBottom: spacing.md },

  // Mini calendar
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  calendarHeaderCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 4,
  },
  calendarHeaderText: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '600',
  },
  calendarCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
  },
  calendarDayText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  calendarToday: {
    backgroundColor: 'rgba(108, 159, 255, 0.15)',
    borderRadius: borderRadius.full,
  },
  calendarTodayText: {
    color: colors.accent,
    fontWeight: '700',
  },
  calendarEarnings: {
    // no bg, just the dot
  },
  calendarSelected: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
  },
  calendarSelectedText: {
    color: colors.background,
    fontWeight: '700',
  },
  earningsDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    position: 'absolute',
    bottom: 4,
  },

  // Timeline
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLine: {
    width: 24,
    alignItems: 'center',
    paddingTop: 6,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    borderWidth: 2,
    borderColor: colors.surface,
    zIndex: 1,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: -1,
  },

  dayCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardToday: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  dayDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  dayDate: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  todayBadge: {
    backgroundColor: 'rgba(108, 159, 255, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
  },
  todayBadgeText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '700',
  },
  tickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tickerBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  tickerText: { fontSize: fontSize.sm, fontWeight: '700' },
});

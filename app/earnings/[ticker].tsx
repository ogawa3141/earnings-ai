import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';
import { AudioPlayer } from '../../components/AudioPlayer';
import { mockEarnings } from '../../lib/api';

export default function EarningsDetailScreen() {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const data = mockEarnings.find((e) => e.ticker === ticker);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>データが見つかりません</Text>
      </View>
    );
  }

  const isPositive = data.surprise >= 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.ticker}>{data.ticker}</Text>
        <Text style={styles.company}>{data.companyName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${data.stockPrice.toFixed(2)}</Text>
          <Text style={[styles.change, { color: data.priceChange >= 0 ? colors.positive : colors.negative }]}>
            {data.priceChange >= 0 ? '+' : ''}{data.priceChange.toFixed(1)}%
          </Text>
        </View>
      </View>

      <AudioPlayer ticker={data.ticker} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 サマリー</Text>
        <Text style={styles.summaryText}>{data.summary}</Text>
      </View>

      {data.keyMetrics && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 主要数値</Text>
          <View style={styles.metricsTable}>
            {data.keyMetrics.map((m) => (
              <View key={m.label} style={styles.metricRow}>
                <Text style={styles.metricLabel}>{m.label}</Text>
                <Text style={styles.metricValue}>{m.value}</Text>
                {m.change !== undefined && (
                  <Text style={[styles.metricChange, { color: m.change >= 0 ? colors.positive : colors.negative }]}>
                    {m.change >= 0 ? '+' : ''}{m.change.toFixed(1)}%
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {data.sections?.map((s) => (
        <View key={s.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{s.title}</Text>
          <Text style={styles.sectionContent}>{s.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  notFound: { color: colors.textSecondary, fontSize: fontSize.lg, textAlign: 'center', marginTop: 100 },
  header: { marginBottom: spacing.lg },
  ticker: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700' },
  company: { color: colors.textSecondary, fontSize: fontSize.md, marginTop: spacing.xs },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  price: { color: colors.text, fontSize: fontSize.xl, fontWeight: '600' },
  change: { fontSize: fontSize.lg, fontWeight: '600' },
  section: {
    backgroundColor: colors.card, borderRadius: 12, padding: spacing.md,
    marginTop: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  sectionTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700', marginBottom: spacing.sm },
  summaryText: { color: colors.textSecondary, fontSize: fontSize.md, lineHeight: 24 },
  sectionContent: { color: colors.textSecondary, fontSize: fontSize.md, lineHeight: 24 },
  metricsTable: { gap: spacing.sm },
  metricRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  metricLabel: { color: colors.textSecondary, fontSize: fontSize.md, flex: 1 },
  metricValue: { color: colors.text, fontSize: fontSize.md, fontWeight: '600', flex: 1, textAlign: 'center' },
  metricChange: { fontSize: fontSize.sm, fontWeight: '600', width: 60, textAlign: 'right' },
});

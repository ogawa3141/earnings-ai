import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';
import { EarningsCard } from '../../components/EarningsCard';
import { useEarnings } from '../../hooks/useEarnings';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 6) return '🌙 おやすみなさい';
  if (h < 12) return '☀️ おはようございます';
  if (h < 17) return '🌤 こんにちは';
  return '🌙 こんばんは';
};

const marketData = [
  { name: 'S&P 500', value: '5,021', change: +0.8 },
  { name: 'NASDAQ', value: '15,892', change: +1.2 },
  { name: 'DOW', value: '38,654', change: -0.3 },
];

export default function HomeScreen() {
  const { earnings, loading } = useEarnings();
  const today = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const beatEarnings = earnings.filter((e) => e.surprise >= 0);
  const missEarnings = earnings.filter((e) => e.surprise < 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={earnings}
        keyExtractor={(item) => item.ticker}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
        ListHeaderComponent={
          <View>
            {/* Greeting */}
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.title}>Today's Earnings</Text>
            <Text style={styles.date}>{today}</Text>

            {/* Market Summary Bar */}
            <View style={styles.marketBar}>
              {marketData.map((m) => (
                <View key={m.name} style={styles.marketItem}>
                  <Text style={styles.marketName}>{m.name}</Text>
                  <Text style={styles.marketValue}>{m.value}</Text>
                  <Text style={[styles.marketChange, { color: m.change >= 0 ? colors.positive : colors.negative }]}>
                    {m.change >= 0 ? '▲' : '▼'} {Math.abs(m.change).toFixed(1)}%
                  </Text>
                </View>
              ))}
            </View>

            {/* Count */}
            <View style={styles.countRow}>
              <Text style={styles.count}>{earnings.length}件の決算発表</Text>
              <View style={styles.countBadges}>
                <View style={[styles.countBadge, { backgroundColor: colors.positiveBackground }]}>
                  <Text style={[styles.countBadgeText, { color: colors.positive }]}>
                    {beatEarnings.length} Beat
                  </Text>
                </View>
                <View style={[styles.countBadge, { backgroundColor: colors.negativeBackground }]}>
                  <Text style={[styles.countBadgeText, { color: colors.negative }]}>
                    {missEarnings.length} Miss
                  </Text>
                </View>
              </View>
            </View>

            {/* Section Header */}
            <Text style={styles.sectionHeader}>📈 アフターアワーズ</Text>
          </View>
        }
        renderItem={({ item }) => <EarningsCard data={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>本日の決算発表はありません</Text>
            <Text style={styles.emptySubtitle}>次の決算発表をお待ちください</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  date: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  marketBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  marketItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  marketName: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '600',
  },
  marketValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '700',
    marginTop: 2,
  },
  marketChange: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  count: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  countBadges: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  countBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sectionHeader: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  list: {
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});

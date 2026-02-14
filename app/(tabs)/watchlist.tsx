import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { useWatchlist } from '../../hooks/useEarnings';
import { TickerSearch } from '../../components/TickerSearch';

const getCountdown = (dateStr: string) => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return '本日';
  if (diff === 1) return '明日';
  return `${diff}日後`;
};

// Decorative mini sparkline
const MiniSparkline: React.FC<{ positive?: boolean }> = ({ positive = true }) => {
  const heights = positive ? [3, 5, 4, 7, 6, 8, 7, 10, 9, 12] : [10, 8, 9, 7, 6, 5, 7, 4, 3, 2];
  const color = positive ? colors.positive : colors.negative;
  return (
    <View style={sparkStyles.container}>
      {heights.map((h, i) => (
        <View key={i} style={[sparkStyles.bar, { height: h, backgroundColor: color }]} />
      ))}
    </View>
  );
};

const sparkStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', gap: 1, height: 14 },
  bar: { width: 2, borderRadius: 1, opacity: 0.6 },
});

export default function WatchlistScreen() {
  const { watchlist, addTicker, removeTicker } = useWatchlist();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View style={styles.container}>
      {showSearch && (
        <View style={styles.searchWrapper}>
          <TickerSearch
            onAdd={(ticker, name) => {
              addTicker({ ticker, companyName: name, nextEarningsDate: '2026-04-30', lastPrice: 0 });
              setShowSearch(false);
            }}
            onClose={() => setShowSearch(false)}
          />
        </View>
      )}
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.ticker}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>ウォッチリスト</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowSearch(true)}>
              <Ionicons name="add" size={22} color={colors.accent} />
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item, index }) => {
          const countdown = getCountdown(item.nextEarningsDate);
          const isUrgent = countdown === '本日' || countdown === '明日';
          return (
            <View style={styles.row}>
              {/* Logo placeholder */}
              <View style={styles.logo}>
                <Text style={styles.logoText}>{item.ticker[0]}</Text>
              </View>

              <View style={styles.rowLeft}>
                <Text style={styles.ticker}>{item.ticker}</Text>
                <Text style={styles.name}>{item.companyName}</Text>
              </View>

              <MiniSparkline positive={index % 2 === 0} />

              <View style={styles.rowRight}>
                <View style={[styles.countdownBadge, isUrgent && styles.countdownUrgent]}>
                  <Text style={[styles.countdownText, isUrgent && styles.countdownTextUrgent]}>
                    {countdown}
                  </Text>
                </View>
                <Text style={styles.dateText}>{item.nextEarningsDate}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteArea}
                onPress={() => removeTicker(item.ticker)}
              >
                <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="telescope-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>ウォッチリストが空です</Text>
            <Text style={styles.emptySubtitle}>上の＋ボタンから銘柄を追加しましょう</Text>
          </View>
        }
      />
      <View style={{ height: 80 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchWrapper: { padding: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: -0.5 },
  addButton: {
    width: 40, height: 40, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(108, 159, 255, 0.12)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(108, 159, 255, 0.3)',
  },
  list: { padding: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.sm,
  },
  logo: {
    width: 36, height: 36, borderRadius: borderRadius.md,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  logoText: { color: colors.accent, fontSize: fontSize.md, fontWeight: '800' },
  rowLeft: { flex: 1 },
  ticker: { color: colors.text, fontSize: fontSize.lg, fontWeight: '800' },
  name: { color: colors.textSecondary, fontSize: fontSize.xs },
  rowRight: { alignItems: 'flex-end', marginRight: spacing.xs },
  countdownBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countdownUrgent: {
    backgroundColor: 'rgba(108, 159, 255, 0.15)',
    borderColor: 'rgba(108, 159, 255, 0.3)',
  },
  countdownText: { color: colors.textSecondary, fontSize: 10, fontWeight: '700' },
  countdownTextUrgent: { color: colors.accent },
  dateText: { color: colors.textTertiary, fontSize: 9, marginTop: 2 },
  deleteArea: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  emptyTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },
  emptySubtitle: { color: colors.textSecondary, fontSize: fontSize.sm },
});

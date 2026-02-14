import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { usePortfolio } from '../../hooks/usePortfolio';
import { AddHoldingModal } from '../../components/AddHoldingModal';

const getCountdown = (dateStr?: string) => {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return '本日';
  if (diff === 1) return '明日';
  return `${diff}日後`;
};

const formatCurrency = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(2)}`;

const formatPL = (n: number) => (n >= 0 ? `+$${n.toFixed(2)}` : `-$${Math.abs(n).toFixed(2)}`);

export default function PortfolioScreen() {
  const { holdings, addHolding, removeHolding, summary } = usePortfolio();
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AddHoldingModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={addHolding}
      />
      <FlatList
        data={holdings}
        keyExtractor={(item) => item.ticker}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>ポートフォリオ</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/csv-import')}>
                  <Ionicons name="document-text-outline" size={20} color={colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setShowAdd(true)}>
                  <Ionicons name="add" size={22} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>ポートフォリオ総額</Text>
              <Text style={styles.summaryValue}>{formatCurrency(summary.totalValue)}</Text>
              <View style={styles.summaryRow}>
                <View style={[styles.plBadge, { backgroundColor: summary.totalPL >= 0 ? colors.positiveBackground : colors.negativeBackground }]}>
                  <Text style={[styles.plBadgeText, { color: summary.totalPL >= 0 ? colors.positive : colors.negative }]}>
                    {formatPL(summary.totalPL)} ({summary.totalPLPercent >= 0 ? '+' : ''}{summary.totalPLPercent.toFixed(2)}%)
                  </Text>
                </View>
                <Text style={styles.summarySubtext}>投資額: {formatCurrency(summary.totalCost)}</Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const pl = (item.currentPrice - item.avgCost) * item.shares;
          const plPct = ((item.currentPrice - item.avgCost) / item.avgCost) * 100;
          const weight = (item.currentPrice * item.shares / summary.totalValue) * 100;
          const countdown = getCountdown(item.nextEarningsDate);
          const isPositive = pl >= 0;

          return (
            <View style={styles.holdingCard}>
              <View style={styles.holdingTop}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>{item.ticker[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ticker}>{item.ticker}</Text>
                  <Text style={styles.companyName}>{item.companyName}</Text>
                </View>
                <TouchableOpacity onPress={() => removeHolding(item.ticker)} style={{ padding: 4 }}>
                  <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              <View style={styles.holdingDetails}>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>株数</Text>
                  <Text style={styles.detailValue}>{item.shares}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>平均取得</Text>
                  <Text style={styles.detailValue}>${item.avgCost.toFixed(2)}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>現在値</Text>
                  <Text style={styles.detailValue}>${item.currentPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.detailCol}>
                  <Text style={styles.detailLabel}>損益</Text>
                  <Text style={[styles.detailValue, { color: isPositive ? colors.positive : colors.negative }]}>
                    {isPositive ? '+' : ''}{plPct.toFixed(1)}%
                  </Text>
                </View>
              </View>

              <View style={styles.holdingFooter}>
                {countdown && (
                  <View style={styles.earningsBadge}>
                    <Ionicons name="calendar-outline" size={12} color={colors.accent} />
                    <Text style={styles.earningsText}>決算: {countdown}</Text>
                  </View>
                )}
                <View style={styles.weightBadge}>
                  <Text style={styles.weightText}>構成比: {weight.toFixed(1)}%</Text>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="briefcase-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>保有銘柄がありません</Text>
            <Text style={styles.emptySubtitle}>＋ボタンから銘柄を追加しましょう</Text>
          </View>
        }
      />
      <View style={{ height: 80 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: -0.5 },
  iconButton: {
    width: 40, height: 40, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(108, 159, 255, 0.12)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(108, 159, 255, 0.3)',
  },
  list: { padding: spacing.md },
  summaryCard: {
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border, ...shadows.md,
  },
  summaryLabel: { color: colors.textSecondary, fontSize: fontSize.sm, fontWeight: '600' },
  summaryValue: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', marginTop: spacing.xs },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  plBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.full },
  plBadgeText: { fontSize: fontSize.sm, fontWeight: '700' },
  summarySubtext: { color: colors.textTertiary, fontSize: fontSize.xs },
  holdingCard: {
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  holdingTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  logo: {
    width: 36, height: 36, borderRadius: borderRadius.md,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  logoText: { color: colors.accent, fontSize: fontSize.md, fontWeight: '800' },
  ticker: { color: colors.text, fontSize: fontSize.lg, fontWeight: '800' },
  companyName: { color: colors.textSecondary, fontSize: fontSize.xs },
  holdingDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  detailCol: { alignItems: 'center' },
  detailLabel: { color: colors.textTertiary, fontSize: 10, fontWeight: '600', marginBottom: 2 },
  detailValue: { color: colors.text, fontSize: fontSize.sm, fontWeight: '700' },
  holdingFooter: { flexDirection: 'row', gap: spacing.sm },
  earningsBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(74, 124, 255, 0.1)', paddingHorizontal: spacing.sm, paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  earningsText: { color: colors.accent, fontSize: 10, fontWeight: '700' },
  weightBadge: {
    backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 3,
    borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border,
  },
  weightText: { color: colors.textSecondary, fontSize: 10, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  emptyTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '600' },
  emptySubtitle: { color: colors.textSecondary, fontSize: fontSize.sm },
});

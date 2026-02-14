import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EarningsData } from '../types';
import { EARNINGS_DETAILS } from '../constants/mockData';
import { colors, spacing, fontSize } from '../constants/theme';

interface Props {
  data: EarningsData;
}

const fmt = (n: number, decimals = 2) => n.toFixed(decimals);
const pct = (n: number) => `${n >= 0 ? '+' : ''}${fmt(n, 1)}%`;
const clr = (n: number) => (n >= 0 ? colors.positive : colors.negative);

export const EarningsCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const detail = EARNINGS_DETAILS[data.ticker];
  const isPositive = data.surprise >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/earnings/${data.ticker}`)}
      activeOpacity={0.7}
    >
      {/* Header: Ticker + Name + Price Change */}
      <View style={styles.header}>
        <View style={styles.tickerRow}>
          <Text style={styles.ticker}>{data.ticker}</Text>
          <Text style={styles.companyName} numberOfLines={1}>{data.companyName}</Text>
          <Text style={[styles.priceChange, { color: clr(data.priceChange) }]}>
            {data.priceChange >= 0 ? '▲' : '▼'}{Math.abs(data.priceChange).toFixed(1)}%
          </Text>
        </View>
        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="headset" size={18} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* 業績サマリー行 */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.label}>EPS</Text>
          <Text style={styles.value}>
            <Text style={styles.dim}>${fmt(data.epsEstimate)}→</Text>
            <Text style={{ color: clr(data.surprise) }}>${fmt(data.epsActual)}</Text>
          </Text>
          <Text style={[styles.badge, { color: clr(data.surprise) }]}>{pct(data.surprise)}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>売上高</Text>
          {detail ? (
            <>
              <Text style={styles.value}>
                <Text style={styles.dim}>{fmt(detail.revenue.estimate, 1)}→</Text>
                <Text>{fmt(detail.revenue.actual, 1)}</Text>
              </Text>
              <Text style={[styles.badge, { color: clr(detail.revenue.yoyGrowth) }]}>
                YoY {pct(detail.revenue.yoyGrowth)}
              </Text>
            </>
          ) : (
            <Text style={styles.value}>${fmt(data.revenueActual, 2)}B</Text>
          )}
        </View>
      </View>

      {/* ガイダンス行 */}
      {detail && (
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.label}>次Q EPS予想</Text>
            <Text style={styles.guidanceValue}>
              ${fmt(detail.guidance.nextQ.eps)}
              <Text style={styles.dim}> (est ${fmt(detail.guidance.nextQ.epsEstimate)})</Text>
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.label}>次Q 売上予想</Text>
            <Text style={styles.guidanceValue}>
              {fmt(detail.guidance.nextQ.revenue, 1)}{detail.guidance.nextQ.unit}
            </Text>
          </View>
        </View>
      )}

      {/* キーメトリクス */}
      {detail && (
        <View style={styles.metricsRow}>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>営業利益率</Text>
            <Text style={styles.metricVal}>{detail.financials.nonGaapOperatingMargin}%</Text>
          </View>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>FCF</Text>
            <Text style={styles.metricVal}>{detail.financials.freeCashFlow}{detail.financials.freeCashFlowUnit}</Text>
          </View>
          <View style={styles.metricChip}>
            <Text style={styles.metricLabel}>株主還元</Text>
            <Text style={styles.metricVal}>{detail.shareholderReturns.total}{detail.shareholderReturns.unit}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  ticker: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  companyName: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    flex: 1,
  },
  priceChange: {
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  audioButton: {
    padding: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 1,
  },
  value: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  dim: {
    color: colors.textSecondary,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
  },
  guidanceValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 4,
  },
  metricChip: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: 4,
    alignItems: 'center',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 9,
  },
  metricVal: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
});

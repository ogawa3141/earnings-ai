import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { EarningsData } from '../types';
import { EARNINGS_DETAILS } from '../constants/mockData';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

interface Props {
  data: EarningsData;
}

const fmt = (n: number, decimals = 2) => n.toFixed(decimals);
const pct = (n: number) => `${n >= 0 ? '+' : ''}${fmt(n, 1)}%`;
const clr = (n: number) => (n >= 0 ? colors.positive : colors.negative);

export const EarningsCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const detail = EARNINGS_DETAILS[data.ticker];
  const isBeat = data.surprise >= 0;
  const borderColor = isBeat ? colors.positive : colors.negative;

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: borderColor }]}
      onPress={() => router.push(`/earnings/${data.ticker}`)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['rgba(17,24,39,0.95)', 'rgba(30,41,59,0.3)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      />

      {/* Header: Logo + Ticker + Badge + Price */}
      <View style={styles.header}>
        <View style={[styles.logo, { backgroundColor: isBeat ? colors.positiveBackground : colors.negativeBackground }]}>
          <Text style={[styles.logoText, { color: borderColor }]}>{data.ticker[0]}</Text>
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.tickerRow}>
            <Text style={styles.ticker}>{data.ticker}</Text>
            <View style={[styles.badge, { backgroundColor: isBeat ? colors.positiveBackground : colors.negativeBackground }]}>
              <Ionicons
                name={isBeat ? 'trending-up' : 'trending-down'}
                size={12}
                color={borderColor}
              />
              <Text style={[styles.badgeText, { color: borderColor }]}>
                {isBeat ? 'BEAT' : 'MISS'}
              </Text>
            </View>
          </View>
          <Text style={styles.companyName} numberOfLines={1}>{data.companyName}</Text>
        </View>
        <View style={styles.priceArea}>
          <View style={[styles.priceChip, { backgroundColor: data.priceChange >= 0 ? colors.positiveBackground : colors.negativeBackground }]}>
            <Text style={[styles.priceChange, { color: clr(data.priceChange) }]}>
              {data.priceChange >= 0 ? '▲' : '▼'} {Math.abs(data.priceChange).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.afterHours}>
            <View style={[styles.afterHoursDot, { backgroundColor: colors.accent }]} />
            <Text style={styles.afterHoursText}>AH</Text>
          </View>
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* 2x2 Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCell}>
          <Text style={styles.metricLabel}>EPS</Text>
          <Text style={styles.metricValue}>
            <Text style={styles.dim}>${fmt(data.epsEstimate)}→</Text>
            <Text style={{ color: clr(data.surprise) }}>${fmt(data.epsActual)}</Text>
          </Text>
          <Text style={[styles.metricPct, { color: clr(data.surprise) }]}>{pct(data.surprise)}</Text>
        </View>
        <View style={styles.metricCell}>
          <Text style={styles.metricLabel}>売上高</Text>
          {detail ? (
            <>
              <Text style={styles.metricValue}>
                <Text style={styles.dim}>{fmt(detail.revenue.estimate, 1)}→</Text>
                <Text>{fmt(detail.revenue.actual, 1)}</Text>
              </Text>
              <Text style={[styles.metricPct, { color: clr(detail.revenue.yoyGrowth) }]}>
                YoY {pct(detail.revenue.yoyGrowth)}
              </Text>
            </>
          ) : (
            <Text style={styles.metricValue}>${fmt(data.revenueActual, 2)}B</Text>
          )}
        </View>
        {detail && (
          <>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>次Q EPS予想</Text>
              <Text style={styles.metricValue}>
                ${fmt(detail.guidance.nextQ.eps)}
              </Text>
              <Text style={styles.dim}>est ${fmt(detail.guidance.nextQ.epsEstimate)}</Text>
            </View>
            <View style={styles.metricCell}>
              <Text style={styles.metricLabel}>次Q 売上予想</Text>
              <Text style={styles.metricValue}>
                {fmt(detail.guidance.nextQ.revenue, 1)}{detail.guidance.nextQ.unit}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Key Metrics Chips */}
      {detail && (
        <>
          <View style={styles.separator} />
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>営業利益率</Text>
              <Text style={styles.chipVal}>{detail.financials.nonGaapOperatingMargin}%</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>FCF</Text>
              <Text style={styles.chipVal}>{detail.financials.freeCashFlow}{detail.financials.freeCashFlowUnit}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>株主還元</Text>
              <Text style={styles.chipVal}>{detail.shareholderReturns.total}{detail.shareholderReturns.unit}</Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    overflow: 'hidden',
    ...shadows.md,
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  headerInfo: {
    flex: 1,
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ticker: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  companyName: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginTop: 1,
  },
  priceArea: {
    alignItems: 'flex-end',
    gap: 4,
  },
  priceChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  priceChange: {
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  afterHours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  afterHoursDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  afterHoursText: {
    color: colors.textTertiary,
    fontSize: 9,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
    opacity: 0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricCell: {
    width: '50%',
    paddingVertical: 4,
    paddingRight: spacing.sm,
  },
  metricLabel: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 1,
  },
  metricValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  metricPct: {
    fontSize: 10,
    fontWeight: '700',
  },
  dim: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipLabel: {
    color: colors.textTertiary,
    fontSize: 9,
    fontWeight: '500',
  },
  chipVal: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
});

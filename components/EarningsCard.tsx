import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EarningsData } from '../types';
import { colors, spacing, fontSize } from '../constants/theme';

interface Props {
  data: EarningsData;
}

export const EarningsCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const isPositive = data.surprise >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/earnings/${data.ticker}`)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.tickerRow}>
          <Text style={styles.ticker}>{data.ticker}</Text>
          <Text style={styles.companyName}>{data.companyName}</Text>
        </View>
        <TouchableOpacity style={styles.audioButton}>
          <Ionicons name="headset" size={20} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>EPS予想</Text>
          <Text style={styles.metricValue}>${data.epsEstimate.toFixed(2)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>EPS実績</Text>
          <Text style={[styles.metricValue, { color: isPositive ? colors.positive : colors.negative }]}>
            ${data.epsActual.toFixed(2)}
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>サプライズ</Text>
          <Text style={[styles.surprise, { color: isPositive ? colors.positive : colors.negative }]}>
            {isPositive ? '+' : ''}{data.surprise.toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${data.stockPrice.toFixed(2)}</Text>
        <Text style={[styles.priceChange, { color: data.priceChange >= 0 ? colors.positive : colors.negative }]}>
          {data.priceChange >= 0 ? '▲' : '▼'} {Math.abs(data.priceChange).toFixed(1)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ticker: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  companyName: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  audioButton: {
    padding: spacing.xs,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginBottom: 2,
  },
  metricValue: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  surprise: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  price: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  priceChange: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});

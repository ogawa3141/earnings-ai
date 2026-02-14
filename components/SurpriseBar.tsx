import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, borderRadius } from '../constants/theme';

interface Props {
  estimate: number;
  actual: number;
  label?: string;
  unit?: string;
}

export const SurpriseBar: React.FC<Props> = ({ estimate, actual, label, unit = '' }) => {
  const diff = actual - estimate;
  const pct = estimate !== 0 ? (diff / Math.abs(estimate)) * 100 : 0;
  const isBeat = diff >= 0;
  const barWidth = Math.min(Math.abs(pct) * 2, 50); // max 50% of width

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.barContainer}>
        {/* Miss side */}
        <View style={styles.halfLeft}>
          {!isBeat && (
            <View
              style={[
                styles.bar,
                styles.barMiss,
                { width: `${barWidth}%`, alignSelf: 'flex-end' },
              ]}
            />
          )}
        </View>
        {/* Center line */}
        <View style={styles.centerLine} />
        {/* Beat side */}
        <View style={styles.halfRight}>
          {isBeat && (
            <View
              style={[
                styles.bar,
                styles.barBeat,
                { width: `${barWidth}%` },
              ]}
            />
          )}
        </View>
      </View>
      <View style={styles.labelsRow}>
        <Text style={styles.estimateLabel}>予想: {estimate}{unit}</Text>
        <Text style={[styles.pctLabel, { color: isBeat ? colors.positive : colors.negative }]}>
          {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%
        </Text>
        <Text style={styles.actualLabel}>実績: {actual}{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginBottom: 4,
  },
  barContainer: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  halfLeft: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  halfRight: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  centerLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.textSecondary,
  },
  bar: {
    height: '100%',
    borderRadius: borderRadius.xs,
  },
  barBeat: {
    backgroundColor: colors.positive,
    opacity: 0.7,
  },
  barMiss: {
    backgroundColor: colors.negative,
    opacity: 0.7,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  estimateLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  pctLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  actualLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },
});

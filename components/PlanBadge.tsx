import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';
import { PlanId } from '../constants/plans';

const planColors: Record<PlanId, string> = {
  free: colors.textSecondary,
  lite: colors.accent,
  pro: '#D2A8FF',
};

export const PlanBadge: React.FC<{ plan: PlanId }> = ({ plan }) => (
  <View style={[styles.badge, { borderColor: planColors[plan] }]}>
    <Text style={[styles.text, { color: planColors[plan] }]}>
      {plan.toUpperCase()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});

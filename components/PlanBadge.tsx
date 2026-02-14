import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';
import { PlanId } from '../constants/plans';

const planColors: Record<PlanId, string> = {
  free: colors.textSecondary,
  lite: colors.accent,
  pro: colors.accentSecondary,
};

export const PlanBadge: React.FC<{ plan: PlanId }> = ({ plan }) => (
  <View style={[styles.badge, { borderColor: planColors[plan], backgroundColor: `${planColors[plan]}15` }]}>
    <Text style={[styles.text, { color: planColors[plan] }]}>
      {plan.toUpperCase()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});

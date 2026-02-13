import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../constants/theme';
import { plans } from '../constants/plans';

export default function PaywallScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🎧 プランを選択</Text>
      <Text style={styles.subtitle}>AI音声で決算をもっと深く理解</Text>

      {plans.map((plan) => (
        <View
          key={plan.id}
          style={[styles.planCard, plan.recommended && styles.recommended]}
        >
          {plan.recommended && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>おすすめ</Text>
            </View>
          )}
          <Text style={styles.planName}>{plan.nameJa}</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <View style={styles.features}>
            {plan.features.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color={colors.positive} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.selectButton, plan.recommended && styles.selectButtonRecommended]}
            onPress={() => router.back()}
          >
            <Text style={[styles.selectText, plan.recommended && styles.selectTextRecommended]}>
              {plan.id === 'free' ? '現在のプラン' : '7日間無料で体験'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.disclaimer}>
        サブスクリプションは自動更新されます。いつでもキャンセル可能です。
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.lg },
  planCard: {
    backgroundColor: colors.card, borderRadius: 16, padding: spacing.lg,
    marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  recommended: { borderColor: colors.accent, borderWidth: 2 },
  badge: {
    backgroundColor: colors.accent, borderRadius: 4,
    paddingHorizontal: spacing.sm, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: spacing.sm,
  },
  badgeText: { color: '#0D1117', fontSize: fontSize.xs, fontWeight: '700' },
  planName: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  planPrice: { color: colors.accent, fontSize: fontSize.lg, fontWeight: '600', marginTop: spacing.xs },
  features: { marginTop: spacing.md, gap: spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { color: colors.textSecondary, fontSize: fontSize.md },
  selectButton: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    padding: spacing.sm, alignItems: 'center', marginTop: spacing.md,
  },
  selectButtonRecommended: { backgroundColor: colors.accent, borderColor: colors.accent },
  selectText: { color: colors.textSecondary, fontSize: fontSize.md, fontWeight: '600' },
  selectTextRecommended: { color: '#0D1117' },
  disclaimer: { color: colors.textSecondary, fontSize: fontSize.xs, textAlign: 'center', marginTop: spacing.md },
});

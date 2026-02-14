import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';
import { plans } from '../constants/plans';

const testimonials = [
  { text: '毎朝の決算チェックが楽しみになりました！', author: '投資家 K.T.' },
  { text: 'AI音声で通勤中に決算分析できるのが最高', author: 'トレーダー M.S.' },
];

const freeVsPro = [
  { feature: '決算サマリー', free: 'テキストのみ', pro: 'AI音声+テキスト' },
  { feature: '銘柄数', free: '5件/日', pro: '無制限' },
  { feature: 'ウォッチリスト', free: '3銘柄', pro: '無制限' },
  { feature: 'プッシュ通知', free: '✗', pro: '✓' },
  { feature: 'オフライン再生', free: '✗', pro: '✓' },
];

export default function PaywallScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <LinearGradient
        colors={[colors.accent, colors.accentSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Ionicons name="headset" size={36} color={colors.background} />
        <Text style={styles.title}>プランを選択</Text>
        <Text style={styles.subtitle}>AI音声で決算をもっと深く理解</Text>
      </LinearGradient>

      {/* Free vs Pro comparison */}
      <View style={styles.comparisonCard}>
        <Text style={styles.comparisonTitle}>Free vs Pro</Text>
        <View style={styles.comparisonHeader}>
          <Text style={[styles.comparisonLabel, { flex: 1 }]}>機能</Text>
          <Text style={styles.comparisonColHeader}>Free</Text>
          <Text style={[styles.comparisonColHeader, { color: colors.accent }]}>Pro</Text>
        </View>
        {freeVsPro.map((row) => (
          <View key={row.feature} style={styles.comparisonRow}>
            <Text style={[styles.comparisonLabel, { flex: 1 }]}>{row.feature}</Text>
            <Text style={styles.comparisonFree}>{row.free}</Text>
            <Text style={styles.comparisonPro}>{row.pro}</Text>
          </View>
        ))}
      </View>

      {/* Plans */}
      {plans.map((plan) => (
        <View
          key={plan.id}
          style={[styles.planCard, plan.recommended && styles.recommended]}
        >
          {plan.recommended && (
            <LinearGradient
              colors={[colors.accent, colors.accentSecondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.recommendedBadge}
            >
              <Text style={styles.badgeText}>✨ おすすめ</Text>
            </LinearGradient>
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
            style={styles.selectButtonWrapper}
            onPress={() => router.back()}
          >
            {plan.recommended ? (
              <LinearGradient
                colors={[colors.accent, colors.accentSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.selectButton}
              >
                <Text style={styles.selectTextRecommended}>7日間無料で体験</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.selectButton, styles.selectButtonDefault]}>
                <Text style={styles.selectText}>
                  {plan.id === 'free' ? '現在のプラン' : '7日間無料で体験'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ))}

      {/* Testimonials */}
      <View style={styles.testimonialSection}>
        <Text style={styles.testimonialHeader}>💬 ユーザーの声</Text>
        {testimonials.map((t, i) => (
          <View key={i} style={styles.testimonialCard}>
            <Text style={styles.testimonialQuote}>"{t.text}"</Text>
            <Text style={styles.testimonialAuthor}>— {t.author}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        サブスクリプションは自動更新されます。いつでもキャンセル可能です。
      </Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },

  headerGradient: {
    borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: '#FFFFFF', fontSize: fontSize.xxl, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: 'rgba(8,12,20,0.7)', fontSize: fontSize.md, marginTop: spacing.xs },

  // Comparison
  comparisonCard: {
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  comparisonTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700', marginBottom: spacing.sm },
  comparisonHeader: { flexDirection: 'row', paddingBottom: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.border },
  comparisonColHeader: { width: 80, color: colors.textSecondary, fontSize: fontSize.xs, fontWeight: '700', textAlign: 'center' },
  comparisonRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  comparisonLabel: { color: colors.textSecondary, fontSize: fontSize.sm },
  comparisonFree: { width: 80, color: colors.textTertiary, fontSize: fontSize.xs, textAlign: 'center' },
  comparisonPro: { width: 80, color: colors.accent, fontSize: fontSize.xs, fontWeight: '600', textAlign: 'center' },

  planCard: {
    backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.lg,
    marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border,
    ...shadows.sm,
  },
  recommended: { borderColor: colors.accent, borderWidth: 2 },
  recommendedBadge: {
    borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: spacing.sm,
  },
  badgeText: { color: '#FFFFFF', fontSize: fontSize.xs, fontWeight: '700' },
  planName: { color: colors.text, fontSize: fontSize.xl, fontWeight: '800' },
  planPrice: { color: colors.accent, fontSize: fontSize.lg, fontWeight: '600', marginTop: spacing.xs },
  features: { marginTop: spacing.md, gap: spacing.sm },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { color: colors.textSecondary, fontSize: fontSize.md },
  selectButtonWrapper: { marginTop: spacing.md },
  selectButton: { borderRadius: borderRadius.md, padding: spacing.sm, alignItems: 'center' },
  selectButtonDefault: { borderWidth: 1, borderColor: colors.border },
  selectText: { color: colors.textSecondary, fontSize: fontSize.md, fontWeight: '600' },
  selectTextRecommended: { color: '#FFFFFF', fontSize: fontSize.md, fontWeight: '700' },

  // Testimonials
  testimonialSection: { marginTop: spacing.md },
  testimonialHeader: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700', marginBottom: spacing.sm },
  testimonialCard: {
    backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.accentSecondary,
  },
  testimonialQuote: { color: colors.text, fontSize: fontSize.sm, fontStyle: 'italic', lineHeight: 20 },
  testimonialAuthor: { color: colors.textTertiary, fontSize: fontSize.xs, marginTop: spacing.xs },

  disclaimer: { color: colors.textTertiary, fontSize: fontSize.xs, textAlign: 'center', marginTop: spacing.lg },
});

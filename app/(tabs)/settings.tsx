import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { PlanBadge } from '../../components/PlanBadge';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);

  const sections = [
    {
      title: 'アカウント',
      items: [
        { icon: 'card' as const, label: 'サブスクリプション', sub: '無料プラン', action: () => router.push('/paywall') },
        { icon: 'language' as const, label: '言語', sub: '日本語' },
      ],
    },
    {
      title: '設定',
      items: [
        { icon: 'business' as const, label: '証券会社連携', sub: 'CSVインポート・API連携', action: () => router.push('/brokerage') },
        { icon: 'notifications' as const, label: '通知設定', toggle: true, value: notifications, onToggle: setNotifications },
        { icon: 'volume-high' as const, label: '音声設定', sub: '速度: 1x' },
      ],
    },
    {
      title: 'その他',
      items: [
        { icon: 'information-circle' as const, label: 'アプリについて', sub: 'v1.0.0' },
        { icon: 'document-text' as const, label: '利用規約' },
        { icon: 'shield-checkmark' as const, label: 'プライバシーポリシー' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>設定</Text>

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={28} color={colors.accent} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>ゲストユーザー</Text>
          <Text style={styles.profileEmail}>demo@example.com</Text>
        </View>
        <PlanBadge plan="free" />
      </View>

      {/* Sections */}
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.row, idx < section.items.length - 1 && styles.rowBorder]}
                onPress={item.action}
                disabled={!!item.toggle}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={20} color={colors.accent} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  {item.sub && <Text style={styles.rowSub}>{item.sub}</Text>}
                </View>
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: colors.surface, true: colors.accent }}
                    thumbColor={colors.text}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.negative }]}>危険ゾーン</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: colors.negativeBackground }]}>
              <Ionicons name="log-out" size={20} color={colors.negative} />
            </View>
            <View style={styles.rowText}>
              <Text style={[styles.rowLabel, { color: colors.negative }]}>ログアウト</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', letterSpacing: -0.5, marginBottom: spacing.lg },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 52, height: 52, borderRadius: borderRadius.full,
    backgroundColor: 'rgba(108, 159, 255, 0.12)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(108, 159, 255, 0.3)',
  },
  profileInfo: { flex: 1 },
  profileName: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700' },
  profileEmail: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 2 },

  section: { marginBottom: spacing.md },
  sectionTitle: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 32, height: 32, borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(108, 159, 255, 0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowLabel: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  rowSub: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 1 },
});

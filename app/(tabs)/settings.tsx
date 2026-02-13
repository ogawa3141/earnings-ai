import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';
import { PlanBadge } from '../../components/PlanBadge';

export default function SettingsScreen() {
  const router = useRouter();

  const items = [
    { icon: 'person-circle' as const, label: 'アカウント', sub: 'demo@example.com' },
    { icon: 'card' as const, label: 'サブスクリプション', sub: '無料プラン', action: () => router.push('/paywall') },
    { icon: 'notifications' as const, label: '通知設定', sub: 'オフ' },
    { icon: 'language' as const, label: '言語', sub: '日本語' },
    { icon: 'volume-high' as const, label: '音声設定', sub: '速度: 1x' },
    { icon: 'information-circle' as const, label: 'アプリについて', sub: 'v1.0.0' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>設定</Text>
        <PlanBadge plan="free" />
      </View>

      {items.map((item) => (
        <TouchableOpacity key={item.label} style={styles.row} onPress={item.action}>
          <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Text style={styles.rowSub}>{item.sub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.card, borderRadius: 12, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  rowText: { flex: 1 },
  rowLabel: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  rowSub: { color: colors.textSecondary, fontSize: fontSize.sm },
});

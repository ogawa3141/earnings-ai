import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const BROKERAGES = [
  { id: 'sbi', name: 'SBI証券', letter: 'S', color: '#0066CC' },
  { id: 'rakuten', name: '楽天証券', letter: '楽', color: '#BF0000' },
  { id: 'monex', name: 'マネックス証券', letter: 'M', color: '#003399' },
  { id: 'nomura', name: '野村證券', letter: '野', color: '#CC0033' },
  { id: 'daiwa', name: '大和証券', letter: '大', color: '#006633' },
  { id: 'au', name: 'auカブコム証券', letter: 'a', color: '#FF6600' },
  { id: 'matsui', name: '松井証券', letter: '松', color: '#333399' },
];

export default function BrokerageScreen() {
  const router = useRouter();
  const [connected] = useState<Record<string, boolean>>({});

  const handleConnect = (name: string) => {
    if (typeof alert === 'function') {
      alert(`${name}のAPI連携は近日公開予定です。\nCSVインポートをご利用ください。`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        証券会社と連携してポートフォリオを自動同期できます。現在はCSVインポートに対応しています。
      </Text>

      {BROKERAGES.map((b) => (
        <View key={b.id} style={styles.card}>
          <View style={[styles.logo, { backgroundColor: b.color + '18' }]}>
            <Text style={[styles.logoText, { color: b.color }]}>{b.letter}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brokerageName}>{b.name}</Text>
            <Text style={styles.status}>
              {connected[b.id] ? '✅ 接続済み' : '未接続'}
            </Text>
          </View>
          <View style={{ gap: spacing.xs }}>
            <TouchableOpacity style={styles.connectButton} onPress={() => handleConnect(b.name)}>
              <Text style={styles.connectText}>API連携</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.csvButton} onPress={() => router.push('/csv-import')}>
              <Text style={styles.csvText}>CSV</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.lg, lineHeight: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, ...shadows.sm,
  },
  logo: {
    width: 44, height: 44, borderRadius: borderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: fontSize.lg, fontWeight: '800' },
  brokerageName: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  status: { color: colors.textTertiary, fontSize: fontSize.xs, marginTop: 2 },
  connectButton: {
    backgroundColor: 'rgba(74, 124, 255, 0.1)', paddingHorizontal: spacing.sm, paddingVertical: 4,
    borderRadius: borderRadius.sm, alignItems: 'center',
  },
  connectText: { color: colors.accent, fontSize: fontSize.xs, fontWeight: '700' },
  csvButton: {
    backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 4,
    borderRadius: borderRadius.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  csvText: { color: colors.textSecondary, fontSize: fontSize.xs, fontWeight: '700' },
});

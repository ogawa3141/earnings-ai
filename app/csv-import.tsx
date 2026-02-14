import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const INSTRUCTIONS = [
  {
    name: 'SBI証券',
    steps: [
      '1. SBI証券にログイン',
      '2. 「口座管理」→「口座（円建）」を開く',
      '3. 「CSVダウンロード」ボタンをクリック',
      '4. ダウンロードしたファイルをここでインポート',
    ],
  },
  {
    name: '楽天証券',
    steps: [
      '1. 楽天証券にログイン',
      '2. 「マイメニュー」→「保有商品一覧」を開く',
      '3. 「CSV出力」ボタンをクリック',
      '4. ダウンロードしたファイルをここでインポート',
    ],
  },
  {
    name: 'マネックス証券',
    steps: [
      '1. マネックス証券にログイン',
      '2. 「保有残高・口座管理」を開く',
      '3. 「CSV出力」をクリック',
      '4. ダウンロードしたファイルをここでインポート',
    ],
  },
];

const MOCK_PREVIEW = [
  { ticker: 'AAPL', name: 'Apple Inc.', shares: 30, avgCost: 185.5 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 15, avgCost: 142.0 },
];

export default function CsvImportScreen() {
  const [selectedBrokerage, setSelectedBrokerage] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        各証券会社からエクスポートしたCSVファイルをインポートして、保有銘柄を一括登録できます。
      </Text>

      {/* Brokerage Instructions */}
      {INSTRUCTIONS.map((inst, idx) => (
        <View key={inst.name}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setSelectedBrokerage(selectedBrokerage === idx ? null : idx)}
          >
            <Text style={styles.accordionTitle}>{inst.name}</Text>
            <Ionicons
              name={selectedBrokerage === idx ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
          {selectedBrokerage === idx && (
            <View style={styles.accordionBody}>
              {inst.steps.map((step) => (
                <Text key={step} style={styles.stepText}>{step}</Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* File Picker */}
      <TouchableOpacity style={styles.fileButton} onPress={() => setShowPreview(true)}>
        <Ionicons name="cloud-upload-outline" size={24} color={colors.accent} />
        <Text style={styles.fileButtonText}>CSVファイルを選択</Text>
      </TouchableOpacity>

      {/* Preview */}
      {showPreview && (
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>インポートプレビュー</Text>
          <View style={styles.previewTable}>
            <View style={styles.previewHeaderRow}>
              <Text style={[styles.previewHeaderCell, { flex: 1 }]}>銘柄</Text>
              <Text style={[styles.previewHeaderCell, { width: 60 }]}>株数</Text>
              <Text style={[styles.previewHeaderCell, { width: 80 }]}>取得単価</Text>
            </View>
            {MOCK_PREVIEW.map((row) => (
              <View key={row.ticker} style={styles.previewRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.previewTicker}>{row.ticker}</Text>
                  <Text style={styles.previewName}>{row.name}</Text>
                </View>
                <Text style={[styles.previewCell, { width: 60 }]}>{row.shares}</Text>
                <Text style={[styles.previewCell, { width: 80 }]}>${row.avgCost.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.confirmButton}>
            <Ionicons name="checkmark" size={20} color="#FFF" />
            <Text style={styles.confirmText}>インポートを確定</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.lg, lineHeight: 20 },
  accordionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.xs, borderWidth: 1, borderColor: colors.border,
  },
  accordionTitle: { color: colors.text, fontSize: fontSize.md, fontWeight: '700' },
  accordionBody: {
    backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  stepText: { color: colors.textSecondary, fontSize: fontSize.sm, marginBottom: spacing.xs, lineHeight: 20 },
  fileButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg,
    marginVertical: spacing.lg, borderWidth: 2, borderColor: colors.accent, borderStyle: 'dashed',
  },
  fileButtonText: { color: colors.accent, fontSize: fontSize.md, fontWeight: '700' },
  previewSection: { marginTop: spacing.sm },
  previewTitle: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700', marginBottom: spacing.md },
  previewTable: {
    backgroundColor: colors.card, borderRadius: borderRadius.lg, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.border,
  },
  previewHeaderRow: {
    flexDirection: 'row', padding: spacing.sm, backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  previewHeaderCell: { color: colors.textTertiary, fontSize: fontSize.xs, fontWeight: '700' },
  previewRow: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  previewTicker: { color: colors.text, fontSize: fontSize.sm, fontWeight: '700' },
  previewName: { color: colors.textSecondary, fontSize: fontSize.xs },
  previewCell: { color: colors.text, fontSize: fontSize.sm, fontWeight: '600', textAlign: 'center' },
  confirmButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
    backgroundColor: colors.accent, borderRadius: borderRadius.md, padding: spacing.md,
    marginTop: spacing.lg,
  },
  confirmText: { color: '#FFF', fontSize: fontSize.md, fontWeight: '700' },
});

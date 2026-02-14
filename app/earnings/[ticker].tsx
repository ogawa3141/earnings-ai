import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';
import { AudioPlayer } from '../../components/AudioPlayer';
import { EARNINGS_DETAILS, EarningsDetail } from '../../constants/mockData';

const clr = (n: number) => (n >= 0 ? colors.positive : colors.negative);
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;
const delta = (cur: number, prev: number) => ((cur - prev) / Math.abs(prev) * 100);

function MetricRow({ label, value, prev, unit, suffix }: { label: string; value: number; prev?: number; unit?: string; suffix?: string }) {
  const s = suffix || '%';
  const change = prev !== undefined ? value - prev : undefined;
  return (
    <View style={styles.metricRow}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}{s}</Text>
      {change !== undefined && (
        <Text style={[styles.metricChange, { color: clr(change) }]}>
          {change >= 0 ? '▲' : '▼'}{Math.abs(change).toFixed(1)}
        </Text>
      )}
    </View>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{icon} {title}</Text>
      {children}
    </View>
  );
}

export default function EarningsDetailScreen() {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const d = EARNINGS_DETAILS[ticker || ''];

  if (!d) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>データが見つかりません</Text>
      </View>
    );
  }

  const f = d.financials;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text style={styles.tickerText}>{d.ticker}</Text>
          <Text style={styles.quarterText}>{d.quarter}</Text>
        </View>
        <Text style={styles.nameText}>{d.name} / {d.nameJa}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <Text style={styles.priceText}>${d.price.toFixed(2)}</Text>
          <Text style={[styles.changeText, { color: clr(d.priceChange) }]}>
            {d.priceChange >= 0 ? '▲' : '▼'}{Math.abs(d.priceChange).toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* 🎧 Audio */}
      <Section icon="🎧" title="音声プレーヤー">
        <AudioPlayer ticker={d.ticker} />
      </Section>

      {/* 📊 業績ハイライト */}
      <Section icon="📊" title="業績ハイライト">
        {/* EPS */}
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>EPS</Text>
          <Text style={styles.metricValue}>
            <Text style={styles.dim}>${d.eps.estimate.toFixed(2)} → </Text>
            <Text style={{ color: clr(d.eps.surprise) }}>${d.eps.actual.toFixed(2)}</Text>
          </Text>
          <Text style={[styles.metricChange, { color: clr(d.eps.surprise) }]}>
            {pct(d.eps.surprise)}
          </Text>
        </View>
        {/* Revenue */}
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>売上高</Text>
          <Text style={styles.metricValue}>
            <Text style={styles.dim}>{d.revenue.estimate}{d.revenue.unit} → </Text>
            <Text>{d.revenue.actual}{d.revenue.unit}</Text>
          </Text>
          <Text style={[styles.metricChange, { color: clr(d.revenue.yoyGrowth) }]}>
            YoY {pct(d.revenue.yoyGrowth)}
          </Text>
        </View>
        <MetricRow label="GAAP粗利益率" value={f.gaapGrossMargin} prev={f.gaapGrossMarginPrev} />
        <MetricRow label="Non-GAAP粗利益率" value={f.nonGaapGrossMargin} prev={f.nonGaapGrossMarginPrev} />
        <MetricRow label="GAAP営業利益率" value={f.gaapOperatingMargin} prev={f.gaapOperatingMarginPrev} />
        <MetricRow label="Non-GAAP営業利益率" value={f.nonGaapOperatingMargin} prev={f.nonGaapOperatingMarginPrev} />
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>営業CF</Text>
          <Text style={styles.metricValue}>{f.operatingCashFlow}{f.operatingCashFlowUnit}</Text>
          <Text style={[styles.metricChange, { color: clr(delta(f.operatingCashFlow, f.operatingCashFlowPrev)) }]}>
            前年比 {pct(delta(f.operatingCashFlow, f.operatingCashFlowPrev))}
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>FCF</Text>
          <Text style={styles.metricValue}>{f.freeCashFlow}{f.freeCashFlowUnit}</Text>
          <Text style={[styles.metricChange, { color: clr(delta(f.freeCashFlow, f.freeCashFlowPrev)) }]}>
            前年比 {pct(delta(f.freeCashFlow, f.freeCashFlowPrev))}
          </Text>
        </View>
      </Section>

      {/* 🔮 ガイダンス */}
      <Section icon="🔮" title="ガイダンス（次四半期）">
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>EPS予想</Text>
          <Text style={[styles.bigValue, { color: clr(d.guidance.nextQ.eps - d.guidance.nextQ.epsEstimate) }]}>
            ${d.guidance.nextQ.eps.toFixed(2)}
          </Text>
          <Text style={styles.dim}>コンセンサス ${d.guidance.nextQ.epsEstimate.toFixed(2)}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>売上高予想</Text>
          <Text style={[styles.bigValue, { color: clr(d.guidance.nextQ.revenue - d.guidance.nextQ.revenueEstimate) }]}>
            {d.guidance.nextQ.revenue}{d.guidance.nextQ.unit}
          </Text>
          <Text style={styles.dim}>コンセンサス {d.guidance.nextQ.revenueEstimate}{d.guidance.nextQ.unit}</Text>
        </View>
      </Section>

      {/* 📋 セグメント別売上 */}
      <Section icon="📋" title="セグメント別売上">
        {d.segments.map((seg, i) => (
          <View key={i} style={styles.metricRow}>
            <Text style={styles.metricLabel}>{seg.name}</Text>
            <Text style={styles.metricValue}>
              {seg.revenue ? `${seg.revenue}${seg.unit}` : ''}
              {seg.share ? ` ${seg.share}` : ''}
            </Text>
            {seg.note && <Text style={styles.noteText}>💡{seg.note}</Text>}
          </View>
        ))}
      </Section>

      {/* 💰 株主還元 */}
      <Section icon="💰" title="株主還元">
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>自社株買い</Text>
          <Text style={styles.metricValue}>{d.shareholderReturns.buyback}{d.shareholderReturns.unit}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>配当</Text>
          <Text style={styles.metricValue}>{d.shareholderReturns.dividend}{d.shareholderReturns.unit}</Text>
        </View>
        <View style={[styles.metricRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 4 }]}>
          <Text style={[styles.metricLabel, { fontWeight: '700' }]}>合計</Text>
          <Text style={[styles.bigValue]}>{d.shareholderReturns.total}{d.shareholderReturns.unit}</Text>
        </View>
      </Section>

      {/* 📅 年間見通し */}
      <Section icon="📅" title="年間見通し">
        {d.outlook.map((item, i) => (
          <Text key={i} style={styles.bulletItem}>• {item}</Text>
        ))}
      </Section>

      {/* 🔬 技術・製品アップデート */}
      <Section icon="🔬" title="技術・製品アップデート">
        {d.techUpdates.map((item, i) => (
          <Text key={i} style={styles.bulletItem}>• {item}</Text>
        ))}
      </Section>

      {/* 💬 経営陣コメント */}
      <Section icon="💬" title="経営陣コメント">
        <View style={styles.quoteBlock}>
          <Text style={styles.quoteLabel}>CEO</Text>
          <Text style={styles.quoteText}>"{d.ceoComment}"</Text>
        </View>
        <View style={[styles.quoteBlock, { marginTop: 8 }]}>
          <Text style={styles.quoteLabel}>CFO</Text>
          <Text style={styles.quoteText}>"{d.cfoComment}"</Text>
        </View>
      </Section>

      {/* 🏢 会社概要 */}
      <Section icon="🏢" title="会社概要">
        <Text style={styles.overviewText}>{d.companyOverview}</Text>
      </Section>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.sm },
  notFound: { color: colors.textSecondary, fontSize: fontSize.lg, textAlign: 'center', marginTop: 100 },
  header: { marginBottom: spacing.sm },
  tickerText: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800' },
  quarterText: { color: colors.accent, fontSize: fontSize.md, fontWeight: '600' },
  nameText: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
  priceText: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  changeText: { fontSize: fontSize.lg, fontWeight: '700' },
  section: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: spacing.sm,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: 6,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexWrap: 'wrap',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    flex: 1,
  },
  metricValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  metricChange: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginLeft: 6,
  },
  bigValue: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
  dim: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  noteText: {
    color: colors.accent,
    fontSize: 10,
    width: '100%',
    marginTop: 1,
  },
  bulletItem: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: 20,
    paddingLeft: 4,
  },
  quoteBlock: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  quoteLabel: {
    color: colors.accent,
    fontSize: fontSize.xs,
    fontWeight: '700',
    marginBottom: 2,
  },
  quoteText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  overviewText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
});

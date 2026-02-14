import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../constants/theme';
import { AudioPlayer } from '../../components/AudioPlayer';
import { SurpriseBar } from '../../components/SurpriseBar';
import { EARNINGS_DETAILS, EarningsDetail } from '../../constants/mockData';

const clr = (n: number) => (n >= 0 ? colors.positive : colors.negative);
const pct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;
const delta = (cur: number, prev: number) => ((cur - prev) / Math.abs(prev) * 100);

function ProgressMetric({ label, value, prev }: { label: string; value: number; prev?: number }) {
  const change = prev !== undefined ? value - prev : undefined;
  const barWidth = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.progressMetric}>
      <View style={styles.progressHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={styles.metricValue}>{value}%</Text>
          {change !== undefined && (
            <Text style={[styles.metricChange, { color: clr(change) }]}>
              {change >= 0 ? '▲' : '▼'}{Math.abs(change).toFixed(1)}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={value >= 0 ? [colors.accent, colors.accentSecondary] : [colors.negative, '#FCA5A5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${barWidth}%` }]}
        />
      </View>
    </View>
  );
}

function MetricRow({ label, value, prev, suffix }: { label: string; value: number; prev?: number; suffix?: string }) {
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

function SegmentBar({ name, revenue, unit, maxRevenue, note }: { name: string; revenue?: number; unit?: string; maxRevenue: number; note?: string }) {
  const width = revenue ? (revenue / maxRevenue) * 100 : 0;
  return (
    <View style={styles.segmentItem}>
      <View style={styles.segmentHeader}>
        <Text style={styles.metricLabel}>{name}</Text>
        {revenue ? <Text style={styles.metricValue}>{revenue}{unit}</Text> : null}
      </View>
      {revenue ? (
        <View style={styles.segmentTrack}>
          <LinearGradient
            colors={[colors.accent, colors.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.segmentFill, { width: `${width}%` }]}
          />
        </View>
      ) : null}
      {note && <Text style={styles.noteText}>💡 {note}</Text>}
    </View>
  );
}

export default function EarningsDetailScreen() {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const d = EARNINGS_DETAILS[ticker || ''];

  if (!d) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.notFound}>データが見つかりません</Text>
        </View>
      </View>
    );
  }

  const f = d.financials;
  const isBeat = d.eps.surprise >= 0;
  const maxSegRev = Math.max(...d.segments.filter((s) => s.revenue).map((s) => s.revenue!));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={[styles.logo, { backgroundColor: isBeat ? colors.positiveBackground : colors.negativeBackground }]}>
            <Text style={[styles.logoText, { color: isBeat ? colors.positive : colors.negative }]}>{d.ticker[0]}</Text>
          </View>
          <View style={styles.headerInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.tickerText}>{d.ticker}</Text>
              <Text style={styles.quarterText}>{d.quarter}</Text>
              <View style={[styles.beatMissBadge, { backgroundColor: isBeat ? colors.positiveBackground : colors.negativeBackground }]}>
                <Text style={[styles.beatMissText, { color: isBeat ? colors.positive : colors.negative }]}>
                  {isBeat ? '✓ BEAT' : '✗ MISS'}
                </Text>
              </View>
            </View>
            <Text style={styles.nameText}>{d.name} / {d.nameJa}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <Text style={styles.priceText}>${d.price.toFixed(2)}</Text>
          <View style={[styles.changePill, { backgroundColor: d.priceChange >= 0 ? colors.positiveBackground : colors.negativeBackground }]}>
            <Text style={[styles.changeText, { color: clr(d.priceChange) }]}>
              {d.priceChange >= 0 ? '▲' : '▼'} {Math.abs(d.priceChange).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Audio */}
      <Section icon="🎧" title="音声プレーヤー">
        <AudioPlayer ticker={d.ticker} />
      </Section>

      {/* EPS & Revenue Surprise Bars */}
      <Section icon="📊" title="業績ハイライト">
        <SurpriseBar estimate={d.eps.estimate} actual={d.eps.actual} label="EPS" unit="$" />
        <SurpriseBar estimate={d.revenue.estimate} actual={d.revenue.actual} label="売上高" unit={d.revenue.unit} />

        <View style={styles.marginSection}>
          <Text style={styles.subSectionTitle}>利益率</Text>
          <ProgressMetric label="GAAP粗利益率" value={f.gaapGrossMargin} prev={f.gaapGrossMarginPrev} />
          <ProgressMetric label="Non-GAAP粗利益率" value={f.nonGaapGrossMargin} prev={f.nonGaapGrossMarginPrev} />
          <ProgressMetric label="GAAP営業利益率" value={f.gaapOperatingMargin} prev={f.gaapOperatingMarginPrev} />
          <ProgressMetric label="Non-GAAP営業利益率" value={f.nonGaapOperatingMargin} prev={f.nonGaapOperatingMarginPrev} />
        </View>

        <View style={styles.cashFlowGrid}>
          <View style={styles.cashFlowCard}>
            <Text style={styles.cashFlowLabel}>営業CF</Text>
            <Text style={styles.cashFlowValue}>{f.operatingCashFlow}{f.operatingCashFlowUnit}</Text>
            <Text style={[styles.cashFlowChange, { color: clr(delta(f.operatingCashFlow, f.operatingCashFlowPrev)) }]}>
              前年比 {pct(delta(f.operatingCashFlow, f.operatingCashFlowPrev))}
            </Text>
          </View>
          <View style={styles.cashFlowCard}>
            <Text style={styles.cashFlowLabel}>FCF</Text>
            <Text style={styles.cashFlowValue}>{f.freeCashFlow}{f.freeCashFlowUnit}</Text>
            <Text style={[styles.cashFlowChange, { color: clr(delta(f.freeCashFlow, f.freeCashFlowPrev)) }]}>
              前年比 {pct(delta(f.freeCashFlow, f.freeCashFlowPrev))}
            </Text>
          </View>
        </View>
      </Section>

      {/* Guidance */}
      <Section icon="🔮" title="ガイダンス（次四半期）">
        {(() => {
          const epsDiff = d.guidance.nextQ.eps - d.guidance.nextQ.epsEstimate;
          const revDiff = d.guidance.nextQ.revenue - d.guidance.nextQ.revenueEstimate;
          return (
            <>
              <View style={styles.guidanceCard}>
                <View style={styles.guidanceRow}>
                  <Text style={styles.guidanceLabel}>EPS予想</Text>
                  <View style={[styles.guidancePill, { backgroundColor: epsDiff >= 0 ? colors.positiveBackground : colors.negativeBackground }]}>
                    <Text style={[styles.guidanceValue, { color: clr(epsDiff) }]}>
                      ${d.guidance.nextQ.eps.toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.dim}>vs コンセンサス ${d.guidance.nextQ.epsEstimate.toFixed(2)}</Text>
                </View>
                <SurpriseBar estimate={d.guidance.nextQ.epsEstimate} actual={d.guidance.nextQ.eps} />
              </View>
              <View style={[styles.guidanceCard, { marginTop: spacing.sm }]}>
                <View style={styles.guidanceRow}>
                  <Text style={styles.guidanceLabel}>売上高予想</Text>
                  <View style={[styles.guidancePill, { backgroundColor: revDiff >= 0 ? colors.positiveBackground : colors.negativeBackground }]}>
                    <Text style={[styles.guidanceValue, { color: clr(revDiff) }]}>
                      {d.guidance.nextQ.revenue}{d.guidance.nextQ.unit}
                    </Text>
                  </View>
                  <Text style={styles.dim}>vs コンセンサス {d.guidance.nextQ.revenueEstimate}{d.guidance.nextQ.unit}</Text>
                </View>
                <SurpriseBar estimate={d.guidance.nextQ.revenueEstimate} actual={d.guidance.nextQ.revenue} />
              </View>
            </>
          );
        })()}
      </Section>

      {/* Segments */}
      <Section icon="📋" title="セグメント別売上">
        {d.segments.map((seg, i) => (
          <SegmentBar
            key={i}
            name={seg.name}
            revenue={seg.revenue}
            unit={seg.unit}
            maxRevenue={maxSegRev}
            note={seg.note}
          />
        ))}
      </Section>

      {/* Shareholder Returns */}
      <Section icon="💰" title="株主還元">
        <View style={styles.returnsGrid}>
          <View style={styles.returnCard}>
            <Text style={styles.returnLabel}>自社株買い</Text>
            <Text style={styles.returnValue}>{d.shareholderReturns.buyback}{d.shareholderReturns.unit}</Text>
          </View>
          <View style={styles.returnCard}>
            <Text style={styles.returnLabel}>配当</Text>
            <Text style={styles.returnValue}>{d.shareholderReturns.dividend}{d.shareholderReturns.unit}</Text>
          </View>
          <View style={[styles.returnCard, styles.returnTotal]}>
            <Text style={styles.returnLabel}>合計</Text>
            <Text style={[styles.returnValue, { color: colors.accent, fontSize: fontSize.lg }]}>
              {d.shareholderReturns.total}{d.shareholderReturns.unit}
            </Text>
          </View>
        </View>
      </Section>

      {/* Outlook */}
      <Section icon="📅" title="年間見通し">
        {d.outlook.map((item, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletItem}>{item}</Text>
          </View>
        ))}
      </Section>

      {/* Tech Updates */}
      <Section icon="🔬" title="技術・製品アップデート">
        {d.techUpdates.map((item, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={[styles.bulletDot, { backgroundColor: colors.accentSecondary }]} />
            <Text style={styles.bulletItem}>{item}</Text>
          </View>
        ))}
      </Section>

      {/* Quotes */}
      <Section icon="💬" title="経営陣コメント">
        <View style={styles.quoteBlock}>
          <Text style={styles.bigQuoteMark}>"</Text>
          <Text style={styles.quoteLabel}>CEO</Text>
          <Text style={styles.quoteText}>{d.ceoComment}</Text>
        </View>
        <View style={[styles.quoteBlock, { marginTop: spacing.sm, borderLeftColor: colors.accentSecondary }]}>
          <Text style={[styles.bigQuoteMark, { color: colors.accentSecondary }]}>"</Text>
          <Text style={[styles.quoteLabel, { color: colors.accentSecondary }]}>CFO</Text>
          <Text style={styles.quoteText}>{d.cfoComment}</Text>
        </View>
      </Section>

      {/* Company Overview */}
      <Section icon="🏢" title="会社概要">
        <Text style={styles.overviewText}>{d.companyOverview}</Text>
      </Section>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  notFound: { color: colors.textSecondary, fontSize: fontSize.lg, textAlign: 'center' },

  header: { marginBottom: spacing.sm },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  logo: {
    width: 48, height: 48, borderRadius: borderRadius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: fontSize.xl, fontWeight: '800' },
  headerInfo: { flex: 1 },
  tickerText: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800' },
  quarterText: { color: colors.accent, fontSize: fontSize.md, fontWeight: '600' },
  beatMissBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  beatMissText: { fontSize: fontSize.xs, fontWeight: '800' },
  nameText: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
  priceText: { color: colors.text, fontSize: fontSize.xl, fontWeight: '700' },
  changePill: {
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  changeText: { fontSize: fontSize.md, fontWeight: '700' },

  section: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subSectionTitle: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },

  // Progress metric
  progressMetric: { marginBottom: spacing.sm },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3,
  },
  progressTrack: { height: 6, backgroundColor: colors.surface, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },

  metricRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, flexWrap: 'wrap',
  },
  metricLabel: { color: colors.textSecondary, fontSize: fontSize.sm, flex: 1 },
  metricValue: { color: colors.text, fontSize: fontSize.sm, fontWeight: '600' },
  metricChange: { fontSize: fontSize.xs, fontWeight: '600', marginLeft: 6 },
  dim: { color: colors.textTertiary, fontSize: fontSize.xs },

  marginSection: { marginTop: spacing.sm },

  cashFlowGrid: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  cashFlowCard: {
    flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.md,
    padding: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  cashFlowLabel: { color: colors.textTertiary, fontSize: 10, fontWeight: '600' },
  cashFlowValue: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700', marginTop: 2 },
  cashFlowChange: { fontSize: 10, fontWeight: '600', marginTop: 2 },

  // Guidance
  guidanceCard: {
    backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.sm,
    borderWidth: 1, borderColor: colors.border,
  },
  guidanceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap', marginBottom: 4 },
  guidanceLabel: { color: colors.textSecondary, fontSize: fontSize.sm },
  guidancePill: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  guidanceValue: { fontSize: fontSize.md, fontWeight: '800' },

  // Segments
  segmentItem: { marginBottom: spacing.sm },
  segmentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  segmentTrack: { height: 8, backgroundColor: colors.surface, borderRadius: 4, overflow: 'hidden' },
  segmentFill: { height: 8, borderRadius: 4 },
  noteText: { color: colors.accent, fontSize: 10, marginTop: 2 },

  // Returns
  returnsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  returnCard: {
    flex: 1, minWidth: '45%', backgroundColor: colors.surface, borderRadius: borderRadius.md,
    padding: spacing.sm, borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  returnTotal: { flexBasis: '100%' },
  returnLabel: { color: colors.textTertiary, fontSize: 10, fontWeight: '600' },
  returnValue: { color: colors.text, fontSize: fontSize.md, fontWeight: '700', marginTop: 2 },

  // Bullets
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: 4 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent, marginTop: 6 },
  bulletItem: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20, flex: 1 },

  // Quotes
  quoteBlock: {
    backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md,
    borderLeftWidth: 3, borderLeftColor: colors.accent, position: 'relative',
  },
  bigQuoteMark: {
    position: 'absolute', top: -4, left: 8,
    fontSize: 40, color: colors.accent, opacity: 0.2, fontWeight: '800',
  },
  quoteLabel: { color: colors.accent, fontSize: fontSize.xs, fontWeight: '700', marginBottom: 4 },
  quoteText: { color: colors.text, fontSize: fontSize.sm, fontStyle: 'italic', lineHeight: 22 },

  overviewText: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 22 },
});

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../../constants/theme';
import { EarningsCard } from '../../components/EarningsCard';
import { useEarnings } from '../../hooks/useEarnings';

export default function HomeScreen() {
  const { earnings, loading } = useEarnings();
  const today = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });

  return (
    <View style={styles.container}>
      <FlatList
        data={earnings}
        keyExtractor={(item) => item.ticker}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Today's Earnings</Text>
            <Text style={styles.date}>{today}</Text>
            <Text style={styles.count}>{earnings.length}件の決算発表</Text>
          </View>
        }
        renderItem={({ item }) => <EarningsCard data={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  date: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  count: {
    color: colors.accent,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.md,
  },
});

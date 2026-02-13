import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../../constants/theme';
import { useWatchlist } from '../../hooks/useEarnings';
import { TickerSearch } from '../../components/TickerSearch';

export default function WatchlistScreen() {
  const { watchlist, addTicker, removeTicker } = useWatchlist();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View style={styles.container}>
      {showSearch && (
        <View style={styles.searchWrapper}>
          <TickerSearch
            onAdd={(ticker, name) => {
              addTicker({ ticker, companyName: name, nextEarningsDate: '2026-04-30', lastPrice: 0 });
              setShowSearch(false);
            }}
            onClose={() => setShowSearch(false)}
          />
        </View>
      )}
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.ticker}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>ウォッチリスト</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowSearch(true)}>
              <Ionicons name="add" size={24} color={colors.accent} />
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.ticker}>{item.ticker}</Text>
              <Text style={styles.name}>{item.companyName}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.dateLabel}>次回決算</Text>
              <Text style={styles.date}>{item.nextEarningsDate}</Text>
            </View>
            <TouchableOpacity onPress={() => removeTicker(item.ticker)}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchWrapper: { padding: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700' },
  addButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  list: { padding: spacing.md },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: 12, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  rowLeft: { flex: 1 },
  ticker: { color: colors.text, fontSize: fontSize.lg, fontWeight: '700' },
  name: { color: colors.textSecondary, fontSize: fontSize.sm },
  rowRight: { alignItems: 'flex-end', marginRight: spacing.sm },
  dateLabel: { color: colors.textSecondary, fontSize: fontSize.xs },
  date: { color: colors.accent, fontSize: fontSize.sm, fontWeight: '600' },
});

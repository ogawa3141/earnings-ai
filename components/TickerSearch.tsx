import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../constants/theme';

const suggestions = [
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'META', name: 'Meta Platforms' },
  { ticker: 'AMD', name: 'Advanced Micro Devices' },
  { ticker: 'CRM', name: 'Salesforce' },
  { ticker: 'NFLX', name: 'Netflix' },
];

interface Props {
  onAdd: (ticker: string, name: string) => void;
  onClose: () => void;
}

export const TickerSearch: React.FC<Props> = ({ onAdd, onClose }) => {
  const [query, setQuery] = useState('');
  const filtered = suggestions.filter(
    (s) => s.ticker.includes(query.toUpperCase()) || s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>銘柄を追加</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ティッカーまたは企業名を入力..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="characters"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => onAdd(item.ticker, item.name)}>
            <Text style={styles.rowTicker}>{item.ticker}</Text>
            <Text style={styles.rowName}>{item.name}</Text>
            <Ionicons name="add-circle-outline" size={22} color={colors.accent} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.sm,
    color: colors.text,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  rowTicker: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '700',
    width: 60,
  },
  rowName: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    flex: 1,
  },
});

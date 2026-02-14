import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius, shadows } from '../constants/theme';

const suggestions = [
  { ticker: 'AAPL', name: 'Apple' },
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'META', name: 'Meta Platforms' },
  { ticker: 'NVDA', name: 'NVIDIA' },
  { ticker: 'TSLA', name: 'Tesla' },
  { ticker: 'AMZN', name: 'Amazon' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'AMD', name: 'Advanced Micro Devices' },
  { ticker: 'AMAT', name: 'Applied Materials' },
  { ticker: 'MRNA', name: 'Moderna' },
  { ticker: 'ENB', name: 'Enbridge' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (ticker: string, companyName: string, shares: number, avgCost: number) => void;
}

export const AddHoldingModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<{ ticker: string; name: string } | null>(null);
  const [shares, setShares] = useState('');
  const [avgCost, setAvgCost] = useState('');

  const filtered = suggestions.filter(
    (s) => s.ticker.includes(query.toUpperCase()) || s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = () => {
    if (!selected || !shares || !avgCost) return;
    onAdd(selected.ticker, selected.name, parseFloat(shares), parseFloat(avgCost));
    setQuery('');
    setSelected(null);
    setShares('');
    setAvgCost('');
    onClose();
  };

  const reset = () => {
    setQuery('');
    setSelected(null);
    setShares('');
    setAvgCost('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>銘柄を追加</Text>
            <TouchableOpacity onPress={reset}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {!selected ? (
            <>
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
                style={{ maxHeight: 200 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.row} onPress={() => { setSelected(item); setQuery(item.ticker); }}>
                    <View style={styles.logo}>
                      <Text style={styles.logoText}>{item.ticker[0]}</Text>
                    </View>
                    <Text style={styles.rowTicker}>{item.ticker}</Text>
                    <Text style={styles.rowName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <>
              <View style={styles.selectedRow}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>{selected.ticker[0]}</Text>
                </View>
                <Text style={styles.rowTicker}>{selected.ticker}</Text>
                <Text style={styles.rowName}>{selected.name}</Text>
                <TouchableOpacity onPress={() => setSelected(null)}>
                  <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>株数</Text>
              <TextInput
                style={styles.input}
                placeholder="例: 100"
                placeholderTextColor={colors.textSecondary}
                value={shares}
                onChangeText={setShares}
                keyboardType="numeric"
              />

              <Text style={styles.label}>平均取得単価 ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="例: 150.00"
                placeholderTextColor={colors.textSecondary}
                value={avgCost}
                onChangeText={setAvgCost}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={[styles.addButton, (!shares || !avgCost) && styles.addButtonDisabled]}
                onPress={handleAdd}
                disabled={!shares || !avgCost}
              >
                <Ionicons name="add" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>追加する</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    maxHeight: '80%',
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: { color: colors.text, fontSize: fontSize.lg, fontWeight: '800' },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    color: colors.text,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  logo: {
    width: 32, height: 32, borderRadius: borderRadius.sm,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  logoText: { color: colors.accent, fontSize: fontSize.sm, fontWeight: '800' },
  rowTicker: { color: colors.text, fontSize: fontSize.md, fontWeight: '700', width: 60 },
  rowName: { color: colors.textSecondary, fontSize: fontSize.sm, flex: 1 },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  addButtonDisabled: { opacity: 0.4 },
  addButtonText: { color: '#FFF', fontSize: fontSize.md, fontWeight: '700' },
});

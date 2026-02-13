import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';
import { useRouter } from 'expo-router';

export const PaywallModal: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.overlay} onPress={() => router.back()} activeOpacity={1}>
      <View style={styles.modal}>
        <Text style={styles.title}>🔒 プレミアム機能</Text>
        <Text style={styles.desc}>AI音声解説を聴くにはライトプラン以上が必要です</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/paywall')}>
          <Text style={styles.buttonText}>プランを見る</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modal: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  desc: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  buttonText: {
    color: '#0D1117',
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});

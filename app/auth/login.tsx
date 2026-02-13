import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン</Text>
      <Text style={styles.subtitle}>Earnings AIへようこそ</Text>

      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/signup')}>
        <Text style={styles.link}>アカウントをお持ちでない方はこちら</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'center' },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.xl },
  input: {
    backgroundColor: colors.card, borderRadius: 8, padding: spacing.md,
    color: colors.text, fontSize: fontSize.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.accent, borderRadius: 8, padding: spacing.md,
    alignItems: 'center', marginTop: spacing.sm,
  },
  buttonText: { color: '#0D1117', fontSize: fontSize.md, fontWeight: '700' },
  link: { color: colors.accent, fontSize: fontSize.sm, textAlign: 'center', marginTop: spacing.lg },
});

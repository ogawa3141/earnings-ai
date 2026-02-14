import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo/Branding */}
      <View style={styles.branding}>
        <LinearGradient
          colors={[colors.accent, colors.accentSecondary]}
          style={styles.logoCircle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="trending-up" size={32} color={colors.background} />
        </LinearGradient>
        <Text style={styles.appName}>Earnings AI</Text>
      </View>

      <Text style={styles.title}>ログイン</Text>
      <Text style={styles.subtitle}>Earnings AIへようこそ</Text>

      <TextInput
        style={[styles.input, emailFocused && styles.inputFocused]}
        placeholder="メールアドレス"
        placeholderTextColor={colors.textTertiary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />
      <TextInput
        style={[styles.input, passwordFocused && styles.inputFocused]}
        placeholder="パスワード"
        placeholderTextColor={colors.textTertiary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />

      <TouchableOpacity style={styles.buttonWrapper}>
        <LinearGradient
          colors={[colors.accent, colors.accentSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ログイン</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>または</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Buttons (visual only) */}
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-apple" size={20} color={colors.text} />
        <Text style={styles.socialText}>Appleでサインイン</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color={colors.text} />
        <Text style={styles.socialText}>Googleでサインイン</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/signup')}>
        <Text style={styles.link}>アカウントをお持ちでない方はこちら</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'center' },
  branding: { alignItems: 'center', marginBottom: spacing.xl },
  logoCircle: {
    width: 64, height: 64, borderRadius: borderRadius.xl,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  appName: { color: colors.text, fontSize: fontSize.xl, fontWeight: '800', letterSpacing: -0.5 },
  title: { color: colors.text, fontSize: fontSize.xxl, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.md, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.xl },
  input: {
    backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md,
    color: colors.text, fontSize: fontSize.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.backgroundSecondary,
  },
  buttonWrapper: { marginTop: spacing.sm },
  button: {
    borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: fontSize.md, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textTertiary, fontSize: fontSize.xs, marginHorizontal: spacing.md },
  socialButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  socialText: { color: colors.text, fontSize: fontSize.md, fontWeight: '600' },
  link: { color: colors.accent, fontSize: fontSize.sm, textAlign: 'center', marginTop: spacing.lg },
});

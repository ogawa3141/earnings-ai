import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="earnings/[ticker]" options={{ title: '' }} />
        <Stack.Screen name="auth/login" options={{ title: 'ログイン' }} />
        <Stack.Screen name="auth/signup" options={{ title: 'サインアップ' }} />
        <Stack.Screen name="paywall" options={{ title: 'プラン選択', presentation: 'modal' }} />
      </Stack>
    </>
  );
}

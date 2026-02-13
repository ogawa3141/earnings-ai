import { Platform } from 'react-native';

const REVENUECAT_API_KEY_IOS = 'your-ios-api-key';
const REVENUECAT_API_KEY_ANDROID = 'your-android-api-key';

export const initPurchases = async () => {
  try {
    const Purchases = require('react-native-purchases').default;
    const apiKey = Platform.OS === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;
    await Purchases.configure({ apiKey });
  } catch (e) {
    console.log('RevenueCat not available (dev mode):', e);
  }
};

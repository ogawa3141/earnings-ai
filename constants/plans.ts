export type PlanId = 'free' | 'lite' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  nameJa: string;
  price: string;
  features: string[];
  maxTickers: number;
  audioAccess: boolean;
  recommended?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    nameJa: '無料',
    price: '¥0',
    features: ['決算サマリー（テキスト）', '上位5銘柄/日', 'ウォッチリスト3銘柄'],
    maxTickers: 3,
    audioAccess: false,
  },
  {
    id: 'lite',
    name: 'Lite',
    nameJa: 'ライト',
    price: '¥480/月',
    features: ['AI音声解説', '全銘柄アクセス', 'ウォッチリスト20銘柄', '決算カレンダー'],
    maxTickers: 20,
    audioAccess: true,
    recommended: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    nameJa: 'プロ',
    price: '¥980/月',
    features: ['AI音声解説', '全銘柄アクセス', 'ウォッチリスト無制限', '決算カレンダー', 'プッシュ通知', 'オフライン再生'],
    maxTickers: Infinity,
    audioAccess: true,
  },
];

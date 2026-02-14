export interface EarningsDetail {
  ticker: string;
  name: string;
  nameJa: string;
  quarter: string;
  reportDate: string;
  priceChange: number;
  price: number;
  eps: { actual: number; estimate: number; surprise: number };
  revenue: { actual: number; estimate: number; unit: string; yoyGrowth: number };
  guidance: {
    nextQ: { eps: number; epsEstimate: number; revenue: number; revenueEstimate: number; unit: string };
  };
  segments: { name: string; revenue?: number; unit?: string; share?: string; note?: string }[];
  financials: {
    gaapGrossMargin: number;
    gaapGrossMarginPrev: number;
    nonGaapGrossMargin: number;
    nonGaapGrossMarginPrev: number;
    gaapOperatingMargin: number;
    gaapOperatingMarginPrev: number;
    nonGaapOperatingMargin: number;
    nonGaapOperatingMarginPrev: number;
    operatingCashFlow: number;
    operatingCashFlowUnit: string;
    operatingCashFlowPrev: number;
    freeCashFlow: number;
    freeCashFlowUnit: string;
    freeCashFlowPrev: number;
  };
  shareholderReturns: { buyback: number; dividend: number; total: number; unit: string };
  outlook: string[];
  techUpdates: string[];
  ceoComment: string;
  cfoComment: string;
  companyOverview: string;
}

export const AMAT_DETAIL: EarningsDetail = {
  ticker: 'AMAT',
  name: 'Applied Materials',
  nameJa: 'アプライド・マテリアルズ',
  quarter: 'FY26 Q1',
  reportDate: '2026-02-12',
  priceChange: 8.08,
  price: 354.91,
  eps: { actual: 2.38, estimate: 2.21, surprise: 7.7 },
  revenue: { actual: 70.1, estimate: 68.8, unit: '億ドル', yoyGrowth: -2 },
  guidance: {
    nextQ: { eps: 2.64, epsEstimate: 2.28, revenue: 76.5, revenueEstimate: 70.2, unit: '億ドル' },
  },
  segments: [
    { name: 'Semiconductor Systems', revenue: 51.4, unit: '億ドル' },
    { name: 'Foundry/Logic', share: '62%' },
    { name: 'DRAM', share: '34%', note: '過去最高のDRAM売上を達成' },
    { name: 'Flash Memory', share: '4%' },
    { name: 'Applied Global Services', revenue: 15.6, unit: '億ドル', note: '過去最高のサービス・スペア売上を達成' },
    { name: 'その他売上', revenue: 3.1, unit: '億ドル' },
  ],
  financials: {
    gaapGrossMargin: 49.0,
    gaapGrossMarginPrev: 48.8,
    nonGaapGrossMargin: 49.1,
    nonGaapGrossMarginPrev: 48.9,
    gaapOperatingMargin: 26.1,
    gaapOperatingMarginPrev: 30.4,
    nonGaapOperatingMargin: 30.0,
    nonGaapOperatingMarginPrev: 30.6,
    operatingCashFlow: 16.9,
    operatingCashFlowUnit: '億ドル',
    operatingCashFlowPrev: 9.3,
    freeCashFlow: 10.4,
    freeCashFlowUnit: '億ドル',
    freeCashFlowPrev: 5.4,
  },
  shareholderReturns: { buyback: 3.37, dividend: 3.65, total: 7.02, unit: '億ドル' },
  outlook: [
    '半導体装置事業: 20%超の成長を予想',
    '需要は2026年後半にさらに加速する見込み',
    'クリーンルームスペースが投資ペースの主要要因',
    '主要顧客が長期的な可能性を提示',
    '勢いは2027年まで継続する見通し',
  ],
  techUpdates: [
    'AI導入の加速が業界投資を牽引',
    '先端ファウンドリ/ロジック、高帯域幅メモリDRAM、先端パッケージング分野で成長',
    'GAA(ゲートオールアラウンド)トランジスタ、バックサイド電力配線、FinFET微細化技術の進展',
    'DRAM: 4F2、3D DRAM、6F2容量追加(HBM含む)',
    '先端パッケージング: HBMパッケージング、ハイブリッドボンディング、3Dチップレットスタッキング',
    'NAND: 層数増加、技術移行による穏やかな成長',
  ],
  ceoComment: 'Applied Materialsは第1四半期に好調な業績を達成しました。AI導入の加速がこれら全てのトレンドを牽引しています。',
  cfoComment: '革新的な製品とサービスへの需要が高まる中、顧客をサポートする能力を確保することに注力しています。',
  companyOverview: 'Applied Materials, Inc.は、世界中のほぼすべての新しい半導体と先端ディスプレイの基盤となる材料エンジニアリングソリューションのリーダーです。',
};

export const MRNA_DETAIL: EarningsDetail = {
  ticker: 'MRNA',
  name: 'Moderna',
  nameJa: 'モデルナ',
  quarter: 'FY25 Q4',
  reportDate: '2026-02-13',
  priceChange: 5.3,
  price: 38.72,
  eps: { actual: -1.28, estimate: -1.52, surprise: 15.79 },
  revenue: { actual: 10.2, estimate: 8.9, unit: '億ドル', yoyGrowth: 14.6 },
  guidance: {
    nextQ: { eps: -0.95, epsEstimate: -1.10, revenue: 8.5, revenueEstimate: 7.8, unit: '億ドル' },
  },
  segments: [
    { name: 'COVID-19ワクチン', revenue: 6.8, unit: '億ドル' },
    { name: 'RSVワクチン', revenue: 2.1, unit: '億ドル', note: '新規承認製品' },
    { name: 'その他', revenue: 1.3, unit: '億ドル' },
  ],
  financials: {
    gaapGrossMargin: 62.0, gaapGrossMarginPrev: 58.0,
    nonGaapGrossMargin: 64.0, nonGaapGrossMarginPrev: 60.0,
    gaapOperatingMargin: -28.0, gaapOperatingMarginPrev: -35.0,
    nonGaapOperatingMargin: -22.0, nonGaapOperatingMarginPrev: -30.0,
    operatingCashFlow: -3.2, operatingCashFlowUnit: '億ドル', operatingCashFlowPrev: -5.1,
    freeCashFlow: -4.0, freeCashFlowUnit: '億ドル', freeCashFlowPrev: -6.2,
  },
  shareholderReturns: { buyback: 0, dividend: 0, total: 0, unit: '億ドル' },
  outlook: ['2026年通期売上ガイダンス$4.0-$5.0Bに上方修正', 'RSVワクチンの貢献拡大見込み'],
  techUpdates: ['がんワクチン Phase3進行中', 'RSVワクチン承認取得'],
  ceoComment: 'パイプラインの進展と売上回復に手応えを感じています。',
  cfoComment: 'コスト削減施策が効果を発揮し、損失幅が縮小しました。',
  companyOverview: 'Moderna, Inc.はmRNA技術を活用した医薬品・ワクチンの開発を行うバイオテクノロジー企業です。',
};

export const MGA_DETAIL: EarningsDetail = {
  ticker: 'MGA',
  name: 'Magna International',
  nameJa: 'マグナ・インターナショナル',
  quarter: 'FY25 Q4',
  reportDate: '2026-02-13',
  priceChange: -2.8,
  price: 45.30,
  eps: { actual: 1.58, estimate: 1.65, surprise: -4.24 },
  revenue: { actual: 106.5, estimate: 108.2, unit: '億ドル', yoyGrowth: -1.6 },
  guidance: {
    nextQ: { eps: 1.45, epsEstimate: 1.55, revenue: 102.0, revenueEstimate: 105.0, unit: '億ドル' },
  },
  segments: [
    { name: 'ボディ・外装', revenue: 42.0, unit: '億ドル' },
    { name: 'パワートレイン', revenue: 32.0, unit: '億ドル' },
    { name: '完成車組立', revenue: 18.5, unit: '億ドル' },
    { name: 'シーティング', revenue: 14.0, unit: '億ドル' },
  ],
  financials: {
    gaapGrossMargin: 14.5, gaapGrossMarginPrev: 15.2,
    nonGaapGrossMargin: 15.0, nonGaapGrossMarginPrev: 15.8,
    gaapOperatingMargin: 5.2, gaapOperatingMarginPrev: 5.7,
    nonGaapOperatingMargin: 5.8, nonGaapOperatingMarginPrev: 6.2,
    operatingCashFlow: 8.5, operatingCashFlowUnit: '億ドル', operatingCashFlowPrev: 9.2,
    freeCashFlow: 4.8, freeCashFlowUnit: '億ドル', freeCashFlowPrev: 5.5,
  },
  shareholderReturns: { buyback: 2.0, dividend: 1.3, total: 3.3, unit: '億ドル' },
  outlook: ['北米市場の回復に慎重', 'EV部品投資を選別的に継続'],
  techUpdates: ['EV向けパワートレイン開発強化', 'ADAS関連受注増'],
  ceoComment: '厳しい市場環境の中、コスト管理を徹底しています。',
  cfoComment: '通期見通しを若干下方修正しますが、下半期の改善を見込んでいます。',
  companyOverview: 'Magna Internationalは世界最大級の自動車部品サプライヤーです。',
};

export const AAP_DETAIL: EarningsDetail = {
  ticker: 'AAP',
  name: 'Advance Auto Parts',
  nameJa: 'アドバンス・オート・パーツ',
  quarter: 'FY25 Q4',
  reportDate: '2026-02-13',
  priceChange: -4.5,
  price: 52.18,
  eps: { actual: 0.35, estimate: 0.42, surprise: -16.67 },
  revenue: { actual: 26.1, estimate: 26.8, unit: '億ドル', yoyGrowth: -2.6 },
  guidance: {
    nextQ: { eps: 0.50, epsEstimate: 0.55, revenue: 27.5, revenueEstimate: 28.0, unit: '億ドル' },
  },
  segments: [
    { name: 'DIY(個人向け)', revenue: 15.2, unit: '億ドル' },
    { name: 'Professional', revenue: 10.9, unit: '億ドル' },
  ],
  financials: {
    gaapGrossMargin: 42.0, gaapGrossMarginPrev: 43.5,
    nonGaapGrossMargin: 42.5, nonGaapGrossMarginPrev: 44.0,
    gaapOperatingMargin: 2.8, gaapOperatingMarginPrev: 3.5,
    nonGaapOperatingMargin: 3.2, nonGaapOperatingMarginPrev: 4.0,
    operatingCashFlow: 1.8, operatingCashFlowUnit: '億ドル', operatingCashFlowPrev: 2.5,
    freeCashFlow: 0.9, freeCashFlowUnit: '億ドル', freeCashFlowPrev: 1.6,
  },
  shareholderReturns: { buyback: 0, dividend: 0.6, total: 0.6, unit: '億ドル' },
  outlook: ['不採算店舗の閉鎖加速', '下半期の回復を見込む'],
  techUpdates: ['オンライン注文の拡充', 'サプライチェーン効率化'],
  ceoComment: 'リストラクチャリングは計画通り進行しています。',
  cfoComment: 'コスト構造の改善に注力し、利益率の回復を目指します。',
  companyOverview: 'Advance Auto Partsは北米最大級の自動車部品小売チェーンです。',
};

export const ENB_DETAIL: EarningsDetail = {
  ticker: 'ENB',
  name: 'Enbridge',
  nameJa: 'エンブリッジ',
  quarter: 'FY25 Q4',
  reportDate: '2026-02-13',
  priceChange: 1.2,
  price: 42.85,
  eps: { actual: 0.75, estimate: 0.72, surprise: 4.17 },
  revenue: { actual: 127.8, estimate: 124.5, unit: '億ドル', yoyGrowth: 2.7 },
  guidance: {
    nextQ: { eps: 0.68, epsEstimate: 0.65, revenue: 118.0, revenueEstimate: 115.0, unit: '億ドル' },
  },
  segments: [
    { name: 'Liquids Pipelines', revenue: 62.0, unit: '億ドル' },
    { name: 'Gas Transmission', revenue: 35.0, unit: '億ドル' },
    { name: 'Gas Distribution', revenue: 22.0, unit: '億ドル' },
    { name: 'Renewable Power', revenue: 8.8, unit: '億ドル' },
  ],
  financials: {
    gaapGrossMargin: 32.0, gaapGrossMarginPrev: 31.0,
    nonGaapGrossMargin: 33.0, nonGaapGrossMarginPrev: 32.0,
    gaapOperatingMargin: 18.0, gaapOperatingMarginPrev: 17.5,
    nonGaapOperatingMargin: 19.0, nonGaapOperatingMarginPrev: 18.5,
    operatingCashFlow: 28.5, operatingCashFlowUnit: '億ドル', operatingCashFlowPrev: 26.0,
    freeCashFlow: 18.2, freeCashFlowUnit: '億ドル', freeCashFlowPrev: 16.8,
  },
  shareholderReturns: { buyback: 0, dividend: 8.5, total: 8.5, unit: '億ドル' },
  outlook: ['パイプライン稼働率96%維持', 'LNGプロジェクト順調'],
  techUpdates: ['再エネ投資拡大', 'カーボンキャプチャー技術導入'],
  ceoComment: '安定したキャッシュフローと成長投資のバランスを維持しています。',
  cfoComment: '29年連続増配を達成し、株主還元を継続します。',
  companyOverview: 'Enbridgeは北米最大級のエネルギーインフラ企業で、パイプライン輸送を主力事業としています。',
};

export const EARNINGS_DETAILS: Record<string, EarningsDetail> = {
  AMAT: AMAT_DETAIL,
  MRNA: MRNA_DETAIL,
  MGA: MGA_DETAIL,
  AAP: AAP_DETAIL,
  ENB: ENB_DETAIL,
};

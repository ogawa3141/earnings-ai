import { EarningsData, WatchlistItem } from '../types';

// Mock data for development
export const mockEarnings: EarningsData[] = [
  {
    ticker: 'AMAT',
    companyName: 'Applied Materials',
    reportDate: '2026-02-13',
    epsEstimate: 2.29,
    epsActual: 2.38,
    surprise: 3.93,
    revenueEstimate: 7.17,
    revenueActual: 7.34,
    stockPrice: 182.45,
    priceChange: 2.1,
    summary: 'Applied Materialsは半導体装置の需要増加により予想を上回る好決算を発表。AI関連の設備投資が引き続き追い風。',
    sections: [
      { title: '業績ハイライト', content: 'EPSは$2.38で予想の$2.29を3.9%上回った。売上高は$7.34Bで予想を2.4%上回る。' },
      { title: 'セグメント別', content: '半導体システム部門が前年比+15%。AGSサービス部門も堅調に推移。' },
      { title: 'ガイダンス', content: '次四半期のEPSガイダンスは$2.30-$2.50。年間見通しを上方修正。' },
    ],
    keyMetrics: [
      { label: 'EPS', value: '$2.38', change: 3.93 },
      { label: '売上高', value: '$7.34B', change: 2.37 },
      { label: '粗利率', value: '48.2%', change: 1.2 },
      { label: 'FCF', value: '$2.1B', change: 5.0 },
    ],
  },
  {
    ticker: 'MRNA',
    companyName: 'Moderna',
    reportDate: '2026-02-13',
    epsEstimate: -1.52,
    epsActual: -1.28,
    surprise: 15.79,
    revenueEstimate: 0.89,
    revenueActual: 1.02,
    stockPrice: 38.72,
    priceChange: 5.3,
    summary: 'Modernaはワクチン売上の回復とコスト削減により、予想を上回る結果。パイプラインの進展にも注目。',
    sections: [
      { title: '業績ハイライト', content: '売上高$1.02Bで予想を大幅に上回る。損失幅も縮小。' },
      { title: 'パイプライン', content: 'RSVワクチンのPhase3結果が良好。がんワクチンも進展。' },
      { title: '見通し', content: '2026年通期売上ガイダンスを$4.0-$5.0Bに上方修正。' },
    ],
    keyMetrics: [
      { label: 'EPS', value: '-$1.28', change: 15.79 },
      { label: '売上高', value: '$1.02B', change: 14.61 },
      { label: 'R&D費', value: '$1.1B', change: -8.0 },
      { label: '現金残高', value: '$9.2B' },
    ],
  },
  {
    ticker: 'MGA',
    companyName: 'Magna International',
    reportDate: '2026-02-13',
    epsEstimate: 1.65,
    epsActual: 1.58,
    surprise: -4.24,
    revenueEstimate: 10.82,
    revenueActual: 10.65,
    stockPrice: 45.30,
    priceChange: -2.8,
    summary: 'Magna Internationalは自動車部品需要の軟化により予想を下回る決算。EV関連投資が利益を圧迫。',
    sections: [
      { title: '業績ハイライト', content: 'EPSは$1.58で予想の$1.65を下回った。北米市場の減速が影響。' },
      { title: 'セグメント別', content: 'ボディ・外装部門は堅調。パワートレイン部門が軟調。' },
      { title: 'ガイダンス', content: '通期見通しを若干下方修正。コスト削減施策を強化。' },
    ],
    keyMetrics: [
      { label: 'EPS', value: '$1.58', change: -4.24 },
      { label: '売上高', value: '$10.65B', change: -1.57 },
      { label: '営業利益率', value: '5.2%', change: -0.5 },
      { label: '受注残', value: '$15.8B' },
    ],
  },
  {
    ticker: 'AAP',
    companyName: 'Advance Auto Parts',
    reportDate: '2026-02-13',
    epsEstimate: 0.42,
    epsActual: 0.35,
    surprise: -16.67,
    revenueEstimate: 2.68,
    revenueActual: 2.61,
    stockPrice: 52.18,
    priceChange: -4.5,
    summary: 'Advance Auto Partsは軟調な消費環境の中、予想を下回る決算。店舗リストラクチャリングを継続。',
    sections: [
      { title: '業績ハイライト', content: 'EPSは$0.35で予想を大幅に下回った。既存店売上は-1.2%。' },
      { title: '施策', content: '不採算店舗の閉鎖を加速。サプライチェーンの効率化を推進。' },
      { title: '見通し', content: '下半期の回復を見込むも、慎重な姿勢を維持。' },
    ],
    keyMetrics: [
      { label: 'EPS', value: '$0.35', change: -16.67 },
      { label: '売上高', value: '$2.61B', change: -2.61 },
      { label: '既存店売上', value: '-1.2%' },
      { label: '店舗数', value: '4,702', change: -2.0 },
    ],
  },
  {
    ticker: 'ENB',
    companyName: 'Enbridge',
    reportDate: '2026-02-13',
    epsEstimate: 0.72,
    epsActual: 0.75,
    surprise: 4.17,
    revenueEstimate: 12.45,
    revenueActual: 12.78,
    stockPrice: 42.85,
    priceChange: 1.2,
    summary: 'Enbridgeはパイプライン事業の安定収益とガス事業の成長により堅調な決算。増配も発表。',
    sections: [
      { title: '業績ハイライト', content: 'EPSは$0.75で予想を上回る。パイプライン稼働率は96%と高水準。' },
      { title: '成長戦略', content: 'LNG関連プロジェクトが順調に進展。再エネ投資も拡大。' },
      { title: '配当', content: '四半期配当を3%増配。29年連続増配を達成。' },
    ],
    keyMetrics: [
      { label: 'EPS', value: '$0.75', change: 4.17 },
      { label: '売上高', value: '$12.78B', change: 2.65 },
      { label: 'DCF/株', value: '$1.42', change: 3.0 },
      { label: '配当利回り', value: '6.8%' },
    ],
  },
];

export const mockWatchlist: WatchlistItem[] = [
  { ticker: 'NVDA', companyName: 'NVIDIA', nextEarningsDate: '2026-02-26', lastPrice: 875.32 },
  { ticker: 'AAPL', companyName: 'Apple', nextEarningsDate: '2026-04-24', lastPrice: 228.15 },
  { ticker: 'MSFT', companyName: 'Microsoft', nextEarningsDate: '2026-04-22', lastPrice: 445.80 },
  { ticker: 'TSLA', companyName: 'Tesla', nextEarningsDate: '2026-04-21', lastPrice: 312.50 },
  { ticker: 'AMZN', companyName: 'Amazon', nextEarningsDate: '2026-04-25', lastPrice: 198.45 },
];

export const getEarnings = async (): Promise<EarningsData[]> => mockEarnings;
export const getEarningsDetail = async (ticker: string): Promise<EarningsData | undefined> =>
  mockEarnings.find((e) => e.ticker === ticker);
export const getWatchlist = async (): Promise<WatchlistItem[]> => mockWatchlist;

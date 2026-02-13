export interface EarningsData {
  ticker: string;
  companyName: string;
  reportDate: string;
  epsEstimate: number;
  epsActual: number;
  surprise: number;  // percentage
  revenueEstimate: number;  // in billions
  revenueActual: number;
  stockPrice: number;
  priceChange: number;  // percentage
  audioUrl?: string;
  summary?: string;
  sections?: EarningsSection[];
  keyMetrics?: KeyMetric[];
}

export interface EarningsSection {
  title: string;
  content: string;
}

export interface KeyMetric {
  label: string;
  value: string;
  change?: number;
}

export interface WatchlistItem {
  ticker: string;
  companyName: string;
  nextEarningsDate: string;
  lastPrice: number;
}

export interface CalendarDay {
  date: string;
  tickers: string[];
}

export type PlaybackSpeed = 1 | 1.5 | 2;

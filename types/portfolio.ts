export interface Holding {
  ticker: string;
  companyName: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  nextEarningsDate?: string;
}

export interface BrokerageInfo {
  id: string;
  name: string;
  connected: boolean;
}

import { useState, useCallback, useMemo } from 'react';
import { Holding } from '../types/portfolio';

const MOCK_HOLDINGS: Holding[] = [
  { ticker: 'AMAT', companyName: 'Applied Materials', shares: 50, avgCost: 320, currentPrice: 354.91, nextEarningsDate: '2026-05-15' },
  { ticker: 'MRNA', companyName: 'Moderna', shares: 100, avgCost: 42, currentPrice: 38.72, nextEarningsDate: '2026-05-07' },
  { ticker: 'ENB', companyName: 'Enbridge', shares: 200, avgCost: 40, currentPrice: 42.85, nextEarningsDate: '2026-05-09' },
];

export const usePortfolio = () => {
  const [holdings, setHoldings] = useState<Holding[]>(MOCK_HOLDINGS);

  const addHolding = useCallback((ticker: string, companyName: string, shares: number, avgCost: number) => {
    setHoldings((prev) => {
      const existing = prev.find((h) => h.ticker === ticker);
      if (existing) {
        return prev.map((h) =>
          h.ticker === ticker ? { ...h, shares: h.shares + shares, avgCost: (h.avgCost * h.shares + avgCost * shares) / (h.shares + shares) } : h
        );
      }
      return [...prev, { ticker, companyName, shares, avgCost, currentPrice: avgCost }];
    });
  }, []);

  const removeHolding = useCallback((ticker: string) => {
    setHoldings((prev) => prev.filter((h) => h.ticker !== ticker));
  }, []);

  const updateHolding = useCallback((ticker: string, shares: number, avgCost: number) => {
    setHoldings((prev) =>
      prev.map((h) => (h.ticker === ticker ? { ...h, shares, avgCost } : h))
    );
  }, []);

  const summary = useMemo(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.currentPrice * h.shares, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.avgCost * h.shares, 0);
    const totalPL = totalValue - totalCost;
    const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;
    return { totalValue, totalCost, totalPL, totalPLPercent };
  }, [holdings]);

  return { holdings, addHolding, removeHolding, updateHolding, summary };
};

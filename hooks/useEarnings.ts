import { useState, useEffect } from 'react';
import { EarningsData, WatchlistItem } from '../types';
import { mockEarnings, mockWatchlist } from '../lib/api';

export const useEarnings = () => {
  const [earnings, setEarnings] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEarnings(mockEarnings);
    setLoading(false);
  }, []);

  return { earnings, loading };
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWatchlist(mockWatchlist);
    setLoading(false);
  }, []);

  const addTicker = (item: WatchlistItem) => {
    setWatchlist((prev) => [...prev, item]);
  };

  const removeTicker = (ticker: string) => {
    setWatchlist((prev) => prev.filter((i) => i.ticker !== ticker));
  };

  return { watchlist, loading, addTicker, removeTicker };
};

import { PricePoint } from '../types';

const API_BASE = 'https://api.frankfurter.dev/v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = { fetchedAt: number; data: PricePoint[] };
const historyCache = new Map<string, CacheEntry>();

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type TimeSeriesResponse = {
  base: string;
  rates: Record<string, Record<string, number>>;
};

export async function fetchHistory(
  base: string,
  quote: string,
  days: number
): Promise<PricePoint[]> {
  const cacheKey = `${base}-${quote}-${days}`;
  const cached = historyCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const url = `${API_BASE}/${toIsoDate(start)}..${toIsoDate(end)}?base=${base}&symbols=${quote}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`為替レートの取得に失敗しました (HTTP ${response.status})`);
  }
  const json: TimeSeriesResponse = await response.json();

  const points: PricePoint[] = Object.entries(json.rates)
    .map(([date, rates]) => ({ date, rate: rates[quote] }))
    .filter((point) => typeof point.rate === 'number')
    .sort((a, b) => a.date.localeCompare(b.date));

  historyCache.set(cacheKey, { fetchedAt: Date.now(), data: points });
  return points;
}

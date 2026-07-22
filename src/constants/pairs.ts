import { CurrencyPair } from '../types';

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { id: 'usdjpy', base: 'USD', quote: 'JPY', label: 'USD/JPY' },
  { id: 'eurusd', base: 'EUR', quote: 'USD', label: 'EUR/USD' },
  { id: 'gbpjpy', base: 'GBP', quote: 'JPY', label: 'GBP/JPY' },
  { id: 'eurjpy', base: 'EUR', quote: 'JPY', label: 'EUR/JPY' },
  { id: 'gbpusd', base: 'GBP', quote: 'USD', label: 'GBP/USD' },
  { id: 'audusd', base: 'AUD', quote: 'USD', label: 'AUD/USD' },
];

export function findPair(id: string): CurrencyPair | undefined {
  return CURRENCY_PAIRS.find((pair) => pair.id === id);
}

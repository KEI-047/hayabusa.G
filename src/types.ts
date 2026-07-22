export type CurrencyPair = {
  id: string;
  base: string;
  quote: string;
  label: string;
};

export type PricePoint = {
  date: string;
  rate: number;
};

export type SignalAction = 'BUY' | 'SELL' | 'HOLD';

export type SignalResult = {
  action: SignalAction;
  score: number;
  reasons: string[];
  latestRate: number;
  changePercent: number;
  rsi: number | null;
  smaShort: number | null;
  smaLong: number | null;
  macdHistogram: number | null;
};

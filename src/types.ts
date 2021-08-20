export type TradingSuggestion = 'LONG' | 'SHORT' | 'NEUTRAL'

export interface OhlcPrice {
  open: number
  high: number
  low: number
  close: number
}

export interface MACDDataPoint {
  macd: number
  signal: number
}

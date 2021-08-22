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

export interface StochasticDataPoint {
  kPercent: number
  dPercent: number
}

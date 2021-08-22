import { round } from 'lodash'
import { movingAverageService } from '../common/movingAverageService'
import { AbstractIndicator } from './abstractIndicator'

export class EmaIndicatorImpl implements AbstractIndicator {
  calculateValues(prices: number[]): number[] {
    const movingAverageLength = 50
    const multiplier = 2 / (movingAverageLength + 1)
    const sma = movingAverageService.calculateSMA(prices.slice(0, movingAverageLength))
    const emas = [sma]
    for (let i = movingAverageLength, a = 0; i < prices.length; i++, a++) {
      emas.push(movingAverageService.calculateEMA(prices[i], emas[a], multiplier))
    }
    return emas.map((value) => round(value, 2))
  }

  calculateTradingSuggestion(prices: number[]): 'LONG' | 'SHORT' | 'NEUTRAL' {
    const hundredDayEMAs = this.calculateValues(prices)
    return prices[prices.length - 1] > hundredDayEMAs[hundredDayEMAs.length - 1] ? 'LONG' : 'SHORT'
  }
}

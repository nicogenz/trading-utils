import { round } from 'lodash'
import { TradingSuggestion } from '../types'
import { movingAverageService } from '../common/movingAverageService'

interface EmaIndicator {
    calculate(prices: number[]): TradingSuggestion
}

class EmaIndicatorImpl implements EmaIndicator {
  calculate(prices: number[]): TradingSuggestion {
    const hundredDayEMAs = this.calculateEMAIndicators(prices)
    return prices[prices.length - 1] > hundredDayEMAs[hundredDayEMAs.length - 1] ? 'LONG' : 'SHORT'
  }

    private calculateEMAIndicators = (prices: number[]): number[] => {
      const movingAverageLength = 50
      const multiplier = 2 / (movingAverageLength + 1)
      const sma = movingAverageService.calculateSMA(prices.slice(0, movingAverageLength))
      const emas = [sma]
      for (let i = movingAverageLength, a = 0; i < prices.length; i++, a++) {
        emas.push(movingAverageService.calculateEMA(prices[i], emas[a], multiplier))
      }
      return emas.map((value) => round(value, 2))
    }
}

export const emaIndicator: EmaIndicator = new EmaIndicatorImpl()

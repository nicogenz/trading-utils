import { min, max } from 'lodash'
import { OhlcPrice, StochasticDataPoint } from '../types'
import { movingAverageService } from '../common/movingAverageService'
import { AbstractIndicator } from './abstractIndicator'

export class StochasticIndicatorImpl implements AbstractIndicator {
  calculateValues(prices: OhlcPrice[]): StochasticDataPoint[] {
    const kPercents = []
    const stochasticValues = []
    for (let i = 14, a = 0; i < prices.length; i++, a++) {
      const highestHigh = max(prices.map((price) => price.high).slice(i - 14, i))!
      const lowestLow = min(prices.map((price) => price.low).slice(i - 14, i))!
      const kPercent = (prices[i - 1].close - lowestLow) / (highestHigh - lowestLow) * 100
      kPercents.push(kPercent)
      if (a > 2) {
        const dPercent = movingAverageService.calculateSMA(kPercents.slice(a - 3, a))
        stochasticValues.push({
          kPercent: kPercents[a - 1],
          dPercent
        })
      }
    }
    return stochasticValues
  }

  calculateTradingSuggestion(prices: any[]): 'LONG' | 'SHORT' | 'NEUTRAL' {
    const stochasticValues = this.calculateValues(prices)
    const oversoldArea = 20
    const overboughtArea = 80
    let suggestion: 'LONG' | 'SHORT' | 'NEUTRAL' = 'NEUTRAL'
    stochasticValues.forEach((stochasticValue) => {
      if (stochasticValue.kPercent <= oversoldArea && stochasticValue.dPercent <= oversoldArea) {
        suggestion = 'LONG'
      } else if (stochasticValue.kPercent >= overboughtArea && stochasticValue.dPercent >= overboughtArea) {
        suggestion = 'SHORT'
      }
    })
    return suggestion
  }
}

import { min, max } from 'lodash'
import { OhlcPrice, TradingSuggestion } from '../types'
import { movingAverageService } from '../common/movingAverageService'

interface StochasticIndicator {
    calculate(ohlcPrices: OhlcPrice[]): TradingSuggestion
}

class StochasticIndicatorImpl implements StochasticIndicator {
  calculate(ohlcPrices: OhlcPrice[]): TradingSuggestion {
    const stochasticValues = this.calculateStochasticValues(ohlcPrices)
    const oversoldArea = 20
    const overboughtArea = 80
    let suggestion: TradingSuggestion = 'NEUTRAL'
    stochasticValues.forEach((stochasticValue) => {
      if (stochasticValue.kPercent <= oversoldArea && stochasticValue.dPercent <= oversoldArea) {
        suggestion = 'LONG'
      } else if (stochasticValue.kPercent >= overboughtArea && stochasticValue.dPercent >= overboughtArea) {
        suggestion = 'SHORT'
      }
    })
    return suggestion
  }

    private calculateStochasticValues = (ohlcPrices: OhlcPrice[]) => {
      const kPercents = []
      const stochasticValues = []
      for (let i = 14, a = 0; i < ohlcPrices.length; i++, a++) {
        const highestHigh = max(ohlcPrices.map((ohlcPrice) => ohlcPrice.high).slice(i - 14, i))!
        const lowestLow = min(ohlcPrices.map((ohlcPrice) => ohlcPrice.low).slice(i - 14, i))!
        const kPercent = (ohlcPrices[i - 1].close - lowestLow) / (highestHigh - lowestLow) * 100
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
}

export const stochasticIndicator: StochasticIndicator = new StochasticIndicatorImpl()

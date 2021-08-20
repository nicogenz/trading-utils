import { round } from 'lodash'
import { TradingSuggestion } from '../types'
import { movingAverageService } from '../common/movingAverageService'

interface RsiIndicator {
    calculate(prices: number[]): TradingSuggestion

    /**
     * Calculates the Relative Strength Index History for the given dataset.
     * @param prices The dataset which will be used for calculating the RSI.
     */
    calculateRSIIndicator(prices: number[]): number[]
}

class RsiIndicatorImpl implements RsiIndicator {
  calculate(prices: number[]): TradingSuggestion {
    const dataPoints = this.calculateRSIIndicator(prices)
    return dataPoints[dataPoints.length - 1] > 50 ? 'LONG' : dataPoints[dataPoints.length - 1] === 50 ? 'NEUTRAL' : 'SHORT'
  }

  calculateRSIIndicator(prices: number[]): number[] {
    if (prices.length < 18) {
      throw new Error('Given parameter "prices" does not have the minimum length of 18')
    }
    const upMoves = []
    const downMoves = []
    for (let i = 1; i < prices.length; i++) {
      const difference = prices[i] - prices[i - 1]
      if (difference >= 0) {
        upMoves.push(difference)
        downMoves.push(0)
      } else {
        upMoves.push(0)
        downMoves.push(difference * -1)
      }
    }
    const gainSMA = movingAverageService.calculateSMA(upMoves.slice(0, 14))
    const lossSMA = movingAverageService.calculateSMA(downMoves.slice(0, 14))
    const avgGains = [gainSMA]
    const avgLoss = [lossSMA]
    for (let i = 14, a = 0; i < upMoves.length; i++, a++) {
      avgGains.push((13 * avgGains[a] + upMoves[i]) / 14)
      avgLoss.push((13 * avgLoss[a] + downMoves[i]) / 14)
    }
    const relativeStrengths = []
    for (let i = 0; i < avgGains.length; i++) {
      relativeStrengths.push(avgGains[i] / avgLoss[i])
    }
    return relativeStrengths.map((rs) => round(100 - 100 / (1 + rs), 2))
  }
}

export const rsiIndicator: RsiIndicator = new RsiIndicatorImpl()

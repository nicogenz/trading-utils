import { round } from 'lodash'
import { MACDDataPoint, TradingSuggestion } from '../types'
import { movingAverageService } from '../common/movingAverageService'

export interface MacdIndicator {
    calculate(prices: number[]): TradingSuggestion
}

export class MacdIndicatorImpl implements MacdIndicator {
  calculate(prices: number[]): TradingSuggestion {
    const dataPoints = this.calculateMACDIndicator(prices)
    const previousDataPoint = dataPoints[dataPoints.length - 2]
    const previousDifference = previousDataPoint.macd - previousDataPoint.signal
    const latestDataPoint = dataPoints[dataPoints.length - 1]
    const latestDifference = latestDataPoint.macd - latestDataPoint.signal
    if (latestDifference >= 0 && latestDifference > previousDifference) {
      return 'LONG'
    } else if (latestDifference < 0 && latestDifference < previousDifference) {
      return 'SHORT'
    } else {
      return 'NEUTRAL'
    }
  }

  /**
     * Calculates the MACD for the given dataset.
     * @param prices The dataset which will be used for calculating the MACD.
     */
  calculateMACDIndicator(prices: number[]): MACDDataPoint[] {
    if (prices.length < 36) {
      throw new Error('Given parameter "prices" does not have the minimum length of 35')
    }

    const twelveDayMultiplier = 2 / (12 + 1)
    const twelveDaySMA = movingAverageService.calculateSMA(prices.slice(0, 12))
    const twelveDayEMAs = [twelveDaySMA]
    for (let i = 12, a = 0; i < prices.length; i++, a++) {
      twelveDayEMAs.push(movingAverageService.calculateEMA(prices[i], twelveDayEMAs[a], twelveDayMultiplier))
    }

    const twentySixDayMultiplier = 2 / (26 + 1)
    const twentySixDaySMA = movingAverageService.calculateSMA(prices.slice(0, 26))
    const twentySixDayEMAs = [twentySixDaySMA]
    for (let i = 26, a = 0; i < prices.length; i++, a++) {
      twentySixDayEMAs.push(movingAverageService.calculateEMA(prices[i], twentySixDayEMAs[a], twentySixDayMultiplier))
    }

    const macds = []
    for (let i = 0, a = 14; i < twentySixDayEMAs.length; i++, a++) {
      macds.push(twelveDayEMAs[a] - twentySixDayEMAs[i])
    }

    const nineDayMultiplier = 2 / (9 + 1)
    const nineDaySma = movingAverageService.calculateSMA(macds.slice(0, 9))
    const nineDayEMAs = [nineDaySma]
    const macdDataPoint: MACDDataPoint[] = []
    for (let i = 9, a = 0; i < macds.length; i++, a++) {
      const macd = macds[i]
      const ema = movingAverageService.calculateEMA(macd, nineDayEMAs[a], nineDayMultiplier)
      nineDayEMAs.push(ema)
      macdDataPoint.push({
        macd: round(macd, 2),
        signal: round(ema, 2)
      })
    }

    return macdDataPoint
  }
}

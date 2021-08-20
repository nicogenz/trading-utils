import { sum } from 'lodash'

interface MovingAverageService {
    calculateSMA(prices: number[]): number

    calculateEMA(priceToday: number, prevEMA: number, multiplier: number): number
}

class MovingAverageServiceImpl implements MovingAverageService {
  calculateSMA(prices: number[]): number {
    return sum(prices) / prices.length
  }

  calculateEMA(priceToday: number, prevEMA: number, multiplier: number): number {
    return (priceToday - prevEMA) * multiplier + prevEMA
  }
}

export const movingAverageService: MovingAverageService = new MovingAverageServiceImpl()

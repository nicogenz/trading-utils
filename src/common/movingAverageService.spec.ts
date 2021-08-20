import { movingAverageService } from './movingAverageService'

describe('MovingAverageService', () => {
  describe('calculateSMA', () => {
    it('should return the simple moving average for the given values', () => {
      const sma = movingAverageService.calculateSMA([118.06, 118.08, 116.58, 118.66, 117.68, 118.50, 119.74, 118.84, 118.40, 119.30, 118.90, 120.30, 124.50, 123.18])

      expect(sma).toEqual(119.33714285714287)
    })
  })

  describe('calculateEMA', () => {
    it('should return the exponential moving average for the given values', () => {
      const previousPrices = [118.06, 118.08, 116.58, 118.66, 117.68, 118.50, 119.74, 118.84, 118.40, 119.30, 118.90, 120.30, 124.50, 123.18]
      const multiplier = 2 / (previousPrices.length + 1)
      const prevEMA = movingAverageService.calculateSMA(previousPrices)

      const ema = movingAverageService.calculateEMA(124.720001, prevEMA, multiplier)

      expect(ema).toEqual(120.05485727619049)
    })
  })
})

export interface AbstractIndicator {
  /**
   * Calculates the indicator values for the given input.
   * @param prices
   */
  calculateValues(prices: any[]): any[]

  /**
   * Calculates a trading suggestion based on the input array.
   * @param prices
   */
  calculateTradingSuggestion(prices: any[]): 'LONG' | 'SHORT' | 'NEUTRAL'
}

import { MacdIndicator, MacdIndicatorImpl } from './indicators/macdIndicator'
import { EmaIndicator, EmaIndicatorImpl } from './indicators/emaIndicator'
import { RsiIndicator, RsiIndicatorImpl } from './indicators/rsiIndicator'
import { StochasticIndicator, StochasticIndicatorImpl } from './indicators/stochasticIndicator'

export const macdIndicator: MacdIndicator = new MacdIndicatorImpl()
export const emaIndicator: EmaIndicator = new EmaIndicatorImpl()
export const rsiIndicator: RsiIndicator = new RsiIndicatorImpl()
export const stochasticIndicator: StochasticIndicator = new StochasticIndicatorImpl()

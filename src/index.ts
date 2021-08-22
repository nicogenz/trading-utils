import { MacdIndicatorImpl } from './indicators/macdIndicator'
import { EmaIndicatorImpl } from './indicators/emaIndicator'
import { RsiIndicatorImpl } from './indicators/rsiIndicator'
import { StochasticIndicatorImpl } from './indicators/stochasticIndicator'
import { AbstractIndicator } from './indicators/abstractIndicator'

export const macdIndicator: AbstractIndicator = new MacdIndicatorImpl()
export const emaIndicator: AbstractIndicator = new EmaIndicatorImpl()
export const rsiIndicator: AbstractIndicator = new RsiIndicatorImpl()
export const stochasticIndicator: AbstractIndicator = new StochasticIndicatorImpl()

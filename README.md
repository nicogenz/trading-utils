# Trading Utils

🚧 In development (APIs may change) 🚧

A collection of helpful trading utility functions fully written in typescript.

## Available Indicators

* RSI
* EMA
* MACD
* Stochastic

## Example usage

```typescript
import { rsiIndicator } from 'trading-utils'

const rsiValues = rsiIndicator.calculateValues([94.449997, 94.769997, ...])
const suggestion = rsiIndicator.calculateTradingSuggestion([94.449997, 94.769997, ...])
```

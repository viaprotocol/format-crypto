import { round } from 'lodash-es'

export const CURRENCY_CRYPTO = 'CURRENCY_CRYPTO'
export const CURRENCY_BASE = 'CURRENCY_BASE'
export const CURRENCY_STABLE = 'CURRENCY_STABLE'
export const CURRENCY_USD = 'CURRENCY_USD'

// eslint-disable-next-line consistent-return
export function formatValue(token, otherValue) {
  // See also `./format.test.js`

  //console.log('formatValue()', token, otherValue)

  //const value = !_.isNull(otherValue) ? otherValue : token?.data?.value
  const value = otherValue

  let decimalsToRound
  switch (token) {
    case CURRENCY_CRYPTO:
      decimalsToRound = 6
      break
    case CURRENCY_BASE:
      decimalsToRound = 6
      break
    case CURRENCY_STABLE:
      decimalsToRound = 2
      break
    case CURRENCY_USD:
      decimalsToRound = 2
      break
    default:
      decimalsToRound = token?.data?.isStable ? 2 : 6
  }

  // Small values
  // $0.004 -> 0.004 (not 0.00)
  const valueString = String(value)
  const [part1 /*, part2*/] = valueString.split('.')
  //console.log('USD < 0.01', part1, +part1, part2, +part2)
  if (+part1 === 0 && value < 0.01) {
    decimalsToRound = 6
  }

  // Smaller-than-min values
  if (value > 0 && value < 0.000001) {
    return '0.000001'
  }

  // Big values
  // 10.1234567890 ETH -> 10.12 ETH
  if (+part1 >= 10) {
    decimalsToRound = 2
  }

  // Special cases
  if (Number.isNaN(value) || value === null) {
    return ''
  }

  if (value === 0) {
    return '0'
  }

  if (value === Infinity) {
    return '∞'
  }
  if (value === -Infinity) {
    return '-∞'
  }

  if (typeof value === 'undefined') {
    return ''
  }

  //console.log(value, token?.data?.symbol, `[${decimalsToRound}]`)

  // Round & remove zeroes
  const rounded = round(value, decimalsToRound)
  const withTrailingZerosString = String(rounded.toFixed(decimalsToRound))
  const [integerPart, decimalPart] = withTrailingZerosString.split('.')
  let dp = decimalPart
  if (decimalPart.length > 2) {
    while (dp[dp.length - 1] === '0' && dp.length > 2) {
      dp = dp.substr(0, dp.length - 1)
    }
  }
  return `${integerPart}.${dp}`
}

export const formatAddress = address => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
}

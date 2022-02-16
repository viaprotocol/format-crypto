import _ from 'lodash'


export const CURRENCY_CRYPTO = 'CURRENCY_CRYPTO'
export const CURRENCY_BASE = 'CURRENCY_BASE'
export const CURRENCY_STABLE = 'CURRENCY_STABLE'
export const CURRENCY_USD = 'CURRENCY_USD'


export const formatValue = (token, otherValue) => {
  // See also `./format.test.js`

  //console.log('formatValue()', token, otherValue)

  //const value = !_.isNull(otherValue) ? otherValue : token?.data?.value
  const value = otherValue

  let decimalsToRound
  switch (token) {
    case (CURRENCY_CRYPTO):
      decimalsToRound = 6
      break
    case (CURRENCY_BASE):
      decimalsToRound = 6
      break
    case (CURRENCY_STABLE):
      decimalsToRound = 2
      break
    case (CURRENCY_USD):
      decimalsToRound = 2
      break
    default:
      decimalsToRound = token?.data?.isStable ? 2 : 6
  }

  // Small values
  // $0.004 -> 0.004 (not 0.00)
  const valueString = '' + value
  const [part1, /*part2*/] = valueString.split('.')
  //console.log('USD < 0.01', part1, +part1, part2, +part2)
  if (+part1 === 0 && value < 0.01) {
    decimalsToRound = 6
  }

  // Big values
  // 10.1234567890 ETH -> 10.12 ETH
  if (+part1 >= 10) {
    decimalsToRound = 2
  }

  // Special cases
  if (isNaN(value) || value === null) {
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

  //console.log(value, token?.data?.symbol, `[${decimalsToRound}]`)

  // Round & remove zeroes
  if (typeof value !== 'undefined') {
    const rounded = _.round(value, decimalsToRound)
    const withTrailingZeros_String = '' + rounded.toFixed(decimalsToRound)
    const [part1, part2] = withTrailingZeros_String.split('.')
    let part2_ = part2
    if (part2.length > 2) {
      while (part2_[part2_.length - 1] === '0' && part2_.length > 2) {
        part2_ = part2_.substr(0, part2_.length - 1)
      }
    }
    return `${part1}.${part2_}`
  }
}

export const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
}

import { formatValue, CURRENCY_USD } from './format'

const DAI = { data: { symbol: 'DAI', isStable: true } }
const ETH = { data: { symbol: 'ETH', isStable: false } }

describe('formatValue', () => {
  // Stables -> 2f
  test('[01] 1.000000000000000000 DAI -> 1.00', () => {
    expect(formatValue(DAI, '1.000000000000000000')).toBe('1.00')
  })
  test('[02] 1 DAI -> 1.00', () => {
    expect(formatValue(DAI, '1')).toBe('1.00')
  })
  test('[03] 0.100000000000000000 DAI -> 0.10', () => {
    expect(formatValue(DAI, '0.100000000000000000')).toBe('0.10')
  })
  test('[04] 0.1 DAI -> 0.10', () => {
    expect(formatValue(DAI, '0.1')).toBe('0.10')
  })
  test('[05] 1.1 DAI -> 1.10', () => {
    expect(formatValue(DAI, '1.1')).toBe('1.10')
  })
  test('[06] 1.11 DAI -> 1.11', () => {
    expect(formatValue(DAI, '1.11')).toBe('1.11')
  })
  test('[07] 1.111 DAI -> 1.11', () => {
    expect(formatValue(DAI, '1.111')).toBe('1.11')
  })
  test('[08] 1.5 DAI -> 1.50', () => {
    expect(formatValue(DAI, '1.5')).toBe('1.50')
  })
  test('[09] 1.15 DAI -> 1.15', () => {
    expect(formatValue(DAI, '1.15')).toBe('1.15')
  })
  test('[10] 1.115 DAI -> 1.12', () => {
    expect(formatValue(DAI, '1.115')).toBe('1.12')
  })
  test('[11] 1.1115 DAI -> 1.11', () => {
    expect(formatValue(DAI, '1.1115')).toBe('1.11')
  })
  test('[12] 99.9 DAI -> 99.90', () => {
    expect(formatValue(DAI, '99.9')).toBe('99.90')
  })
  test('[13] 99.99 DAI -> 99.99', () => {
    expect(formatValue(DAI, '99.99')).toBe('99.99')
  })
  test('[14] 99.999 DAI -> 100.00', () => {
    expect(formatValue(DAI, '99.999')).toBe('100.00')
  })
  test('[15] 99.9999 DAI -> 100.00', () => {
    expect(formatValue(DAI, '99.9999')).toBe('100.00')
  })

  // Not stables -> 6f
  test('[16] 1.000000000000000000 ETH -> 1.00', () => {
    expect(formatValue(DAI, '1.000000000000000000')).toBe('1.00')
  })
  test('[17] 1 ETH -> 1.00', () => {
    expect(formatValue(DAI, '1')).toBe('1.00')
  })
  test('[18] 0.100000000000000000 ETH -> 0.10', () => {
    expect(formatValue(ETH, '0.100000000000000000')).toBe('0.10')
  })
  test('[19] 0.1 ETH -> 0.10', () => {
    expect(formatValue(ETH, '0.1')).toBe('0.10')
  })
  test('[20] 0.10001 ETH -> 0.10001', () => {
    expect(formatValue(ETH, '0.10001')).toBe('0.10001')
  })
  test('[21] 0.100001 ETH -> 0.100001', () => {
    expect(formatValue(ETH, '0.100001')).toBe('0.100001')
  })
  test('[22] 0.1000001 ETH -> 0.10', () => {
    expect(formatValue(ETH, '0.1000001')).toBe('0.10')
  })
  test('[23] 0.10000001 ETH -> 0.10', () => {
    expect(formatValue(ETH, '0.10000001')).toBe('0.10')
  })
  test('[24] 0.10005 ETH -> 0.10005', () => {
    expect(formatValue(ETH, '0.10005')).toBe('0.10005')
  })
  test('[25] 0.100005 ETH -> 0.100005', () => {
    expect(formatValue(ETH, '0.100005')).toBe('0.100005')
  })
  test('[26] 0.1000005 ETH -> 0.100001', () => {
    expect(formatValue(ETH, '0.1000005')).toBe('0.100001')
  })
  test('[27] 0.10000005 ETH -> 0.10', () => {
    expect(formatValue(ETH, '0.10000005')).toBe('0.10')
  })
  test('[28] 0.99999 ETH -> 0.99999', () => {
    expect(formatValue(ETH, '0.99999')).toBe('0.99999')
  })
  test('[29] 0.999999 ETH -> 0.999999', () => {
    expect(formatValue(ETH, '0.999999')).toBe('0.999999')
  })
  test('[30] 0.9999999 ETH -> 1.00', () => {
    expect(formatValue(ETH, '0.9999999')).toBe('1.00')
  })
  test('[31] 0.99999999 ETH -> 1.00', () => {
    expect(formatValue(ETH, '0.99999999')).toBe('1.00')
  })

  // Fiat -> 2f
  test('[32] 12.3456 USD -> 12.35', () => {
    expect(formatValue(CURRENCY_USD, '12.3456')).toBe('12.35')
  })

  // Fiat, 0.00... -> 6f | (?) Fiat, < 0.004(9)
  test('[33] 0.004 USD -> 0.004', () => {
    expect(formatValue(CURRENCY_USD, '0.004')).toBe('0.004')
  })
  test('[34] 0.00401 USD -> 0.00401', () => {
    expect(formatValue(CURRENCY_USD, '0.00401')).toBe('0.00401')
  })
  test('[35] 0.005 USD -> 0.005', () => {
    expect(formatValue(CURRENCY_USD, '0.005')).toBe('0.005')
  })
  test('[36] 0.0005 USD -> 0.0005', () => {
    expect(formatValue(CURRENCY_USD, '0.0005')).toBe('0.0005')
  })
  test('[37] 0.000500001 USD -> 0.0005', () => {
    expect(formatValue(CURRENCY_USD, '0.000500001')).toBe('0.0005')
  })
  test('[38] 0.0011111 USD -> 0.001111', () => {
    expect(formatValue(CURRENCY_USD, '0.0011111')).toBe('0.001111')
  })
  test('[39] 0.0012345 USD -> 0.001235', () => {
    expect(formatValue(CURRENCY_USD, '0.0012345')).toBe('0.001235')
  })

  // Big values
  test('[40] 10 ETH => 10.00 ETH', () => {
    expect(formatValue(ETH, '10')).toBe('10.00')
  })
  test('[41] 10.1234567890 ETH -> 10.12 ETH', () => {
    expect(formatValue(ETH, '10.1234567890')).toBe('10.12')
  })
  test('[42] 10 DAI -> 10.00 DAI', () => {
    expect(formatValue(DAI, '10')).toBe('10.00')
  })
  test('[43] 10.1234567890 DAI -> 10.12 DAI', () => {
    expect(formatValue(DAI, '10.1234567890')).toBe('10.12')
  })

  // Smaller-than-min values
  test('[44] 0.0000000001 ETH -> 0.000001', () => {
    expect(formatValue(ETH, '0.0000000001')).toBe('0.000001')
  })
  test('[45] 0.0000000001 USD -> 0.000001', () => {
    expect(formatValue(CURRENCY_USD, '0.0000000001')).toBe('0.000001')
  })

  // Special cases
  test('[46] undefined ETH -> \'\'', () => {
    expect(formatValue(ETH, undefined)).toBe('')
  })
  test('[47] Infinity ETH -> ∞', () => {
    expect(formatValue(ETH, 1 / 0)).toBe('∞')
  })
  test('[48] -Infinity ETH -> -∞', () => {
    expect(formatValue(ETH, -1 / 0)).toBe('-∞')
  })
  test('[49] NaN -> \'\'', () => {
    expect(formatValue(ETH, NaN)).toBe('')
  })
  test('[50] null -> \'\'', () => {
    expect(formatValue(ETH, null)).toBe('')
  })
  test('[51] 0 -> 0', () => {
    expect(formatValue(ETH, 0)).toBe('0')
  })
})

/*
### Fiat todo:
```
$0.001 -> ?
$0.0001 -> ?
$0.00001 -> ?
$0.000001 -> ?
$0.0000001 -> ?
$0.005 -> ?
$0.0005 -> ?
$0.00005 -> ?
$0.000005 -> ?
$0.0000005 -> ?
$0.99 -> ?
$0.999 -> ?
$0.9999 -> ?
$0.99999 -> ?
$0.999999 -> ?
$0.9999999 -> ?
```
*/

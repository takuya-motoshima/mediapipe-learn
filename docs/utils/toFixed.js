/**
 * Truncate decimals to specified digits.
 * @param {number} decimal Decimal number.
 * @param {number} fixed Decimal places to be truncated.
 * @return {number} Truncated value.
 */
export default (decimal, fixed) => ~~(Math.pow(10, fixed) * decimal) / Math.pow(10, fixed);
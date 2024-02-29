export interface IFuturesMarginItem {
  /** 交易所 */
  exchange: string;
  /** 品种 */
  product: string;
  /** 代码 */
  symbol: string;
  /** 交割月份 */
  delivery_month: string;
  /** 合约乘数 */
  contract_multiplier: string;
  /** 交易所标准保证金 */
  exchange_standard_margin: string;
  /** 徽商期货保证金 */
  huishang_standard_margin: string;
  key: string;
}

export type IBanProduct = Pick<IFuturesMarginItem, 'product' | 'symbol'>
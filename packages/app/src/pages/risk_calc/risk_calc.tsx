import { useEffect, useState } from 'react'
import { InputNumber, Select } from 'antd'
import { SelectProps } from 'antd/es/select';
import styles from './styles.module.less'
import { useAtom } from 'jotai';
import { Atoms } from '@/store';

export const RiskCalc = () => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [futuresMargin] = useAtom(Atoms.futuresMarginAtom);
  const [myMoney, setMyMoney] = useState<number>(0);
  const [productDeliveryMonth, setProductDeliveryMonth] = useState<string>();
  const [productPrice, setProductPrice] = useState<number>(0);
  useEffect(() => {
    const options = futuresMargin.map(el => ({
      label: `${el.product}-${el.delivery_month}`,
      value: el.delivery_month,
      code: el.symbol,
    }))
    setOptions(options);
  }, []);
  const exchange = futuresMargin.find(el => el.delivery_month === productDeliveryMonth)?.exchange;
  const standardMargin = futuresMargin.find(el => el.delivery_month === productDeliveryMonth)?.huishang_standard_margin ?? 0;
  const contractMultiplier = futuresMargin.find(el => el.delivery_month === productDeliveryMonth)?.contract_multiplier ?? 0;
  const OneContractCost = Number((productPrice * Number(contractMultiplier) * Number(standardMargin)).toFixed(2));
  const canBuyContracts = OneContractCost !== 0 ? Math.round(myMoney / OneContractCost) : 0
  const handleProductSelectChange = (value: string) => {
    setProductDeliveryMonth(value)
  }
  return (
    <div className={styles.riskCalcWrapper}>
      <header className={styles.title}>期货交易风险计算面板</header>
      <div className={styles.inputBody}>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>预算</div>
          <InputNumber
            addonAfter="￥"
            precision={2}
            min={0}
            step={0.01}
            value={myMoney}
            onChange={(val) => setMyMoney(val ?? 0)}
          />
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>品种</div>
          <Select
            showSearch
            placeholder="选择一个品种"
            options={options}
            optionFilterProp='label'
            value={productDeliveryMonth}
            onChange={handleProductSelectChange}
            allowClear
          />
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>品种当前价格</div>
          <InputNumber
            addonAfter="￥"
            precision={2}
            min={0}
            step={0.01}
            value={productPrice}
            onChange={(val) => setProductPrice(val ?? 0)}
          />
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>交易所</div>
          <div>{ exchange ?? '未查询到数据' }</div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>保证金比例</div>
          <div>{ `${Number(standardMargin) * 100}%` }</div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>合约乘数</div>
          <div>{ contractMultiplier ?? 0 }</div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>一手合约成本</div>
          <div>{ OneContractCost }￥</div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>总花费</div>
          <div className={styles.itemMulti}>
            {
              canBuyContracts - 1 > 0 && (
                <div className={styles.rowCost}>
                  <div className={styles.itemTitle}>{ canBuyContracts - 1 }手总花费</div>
                  <div>{ (canBuyContracts - 1) * productPrice }￥</div>
                </div>
              )
            }
            <div className={styles.rowCost}>
              <div className={styles.itemTitle}>{ canBuyContracts }手总花费</div>
              <div>{ canBuyContracts * productPrice }￥</div>
            </div>
            <div className={styles.rowCost}>
              <div className={styles.itemTitle}>{ canBuyContracts + 1 }手总花费</div>
              <div>{ (canBuyContracts + 1) * productPrice }￥</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
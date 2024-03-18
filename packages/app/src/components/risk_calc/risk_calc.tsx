import { useEffect, useMemo, useState } from 'react'
import { Divider, InputNumber, Select } from 'antd'
import { SelectProps } from 'antd/es/select';
import styles from './styles.module.less'
import { useAtom } from 'jotai';
import { Atoms } from '@/store';
import _ from 'lodash';
import classNames from 'classnames';

export const RiskCalc = () => {
  const [futuresMargin] = useAtom(Atoms.futuresMarginAtom);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [productDeliveryMonth, setProductDeliveryMonth] = useState<string>();
  const [productPrice, setProductPrice] = useState<number>(0);
  // 总资金
  const [totalMoney, setTotalMoney] = useState(0);
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
  // 一手合约成本
  const oneContractCost = Number((productPrice * Number(contractMultiplier) * Number(standardMargin)).toFixed(2));
  const canBuyContracts = oneContractCost !== 0 ? Math.floor(totalMoney / oneContractCost) : 0;
  const handleProductSelectChange = (value: string) => {
    setProductDeliveryMonth(value)
  }
  const handleProductPriceChange = _.debounce((value: number | null) => {
    setProductPrice(value ?? 0)
  }, 300)
  useEffect(() => {
    return () => {
      handleProductPriceChange.cancel();
    }
  }, [handleProductPriceChange])
  const costData = useMemo(() => {
    const data = [];
    for (let i = 1; i <= canBuyContracts; i++) {
      const cost: number = Number((i * oneContractCost).toFixed(2));
      data.push({
        contractNum: i,
        cost,
        percentTotalMoney: Number((cost / totalMoney).toFixed(2)),
      })
    }
    return data;
  }, [oneContractCost, canBuyContracts, totalMoney])

  return (
    <div className={styles.riskCalcWrapper}>
      <div className={styles.inputItem}>
        <div className={styles.itemTitle}>期货账户总金额</div>
        <InputNumber
          addonAfter="￥"
          precision={2}
          min={0}
          step={0.01}
          value={totalMoney}
          onChange={(val) => setTotalMoney(val ?? 0)}
        />
      </div>
      <div className={styles.costBody}>
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
          <div className={styles.itemTitle}>品种计算价格</div>
          <InputNumber
            addonAfter="￥"
            precision={2}
            min={0}
            step={0.01}
            value={productPrice}
            onChange={handleProductPriceChange}
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
          <div>{ oneContractCost }￥</div>
        </div>
        <div className={styles.inputItem}>
          <div className={styles.itemTitle}>手数计算</div>
          <div className={styles.itemMulti}>
            {
              costData.map((el, index) => {
                const isDanger = el.percentTotalMoney > 0.2
                return (
                  <div className={classNames(
                      styles.row,
                      isDanger ? styles.highlight : null
                    )}
                    key={index}
                  >
                    <div>{ el.contractNum }手</div>
                    <Divider type="vertical" />
                    <div>总花费：{ el.cost }￥</div>
                    <Divider type="vertical" />
                    <div>仓位占比：{ el.percentTotalMoney }</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
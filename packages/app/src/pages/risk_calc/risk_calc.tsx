import { useEffect, useState } from 'react'
import Api from '@/api';
import { InputNumber, Select } from 'antd'
import { SelectProps } from 'antd/es/select';
import styles from './styles.module.less'
import { useStore } from 'jotai';
import { featureOptionAtom } from '@/store';
export const RiskCalc = () => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const myStore = useStore();
  console.log('myStore =', myStore.get(featureOptionAtom))
  return (
    <div className={styles.riskCalcWrapper}>
      <header className={styles.title}>期货交易风险计算面板</header>
      <div className={styles.inputBody}>
        <div className={styles.inputItem}>
          <div>本金</div>
          <InputNumber addonAfter="￥" defaultValue={10000} precision={2} min={10000}/>
        </div>
        <div className={styles.inputItem}>
          <div>品种</div>
          <Select
            showSearch
            placeholder="选择一个品种"
            options={options}
          />
        </div>
      </div>
    </div>
  )
}
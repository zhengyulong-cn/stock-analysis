import { RiskCalc } from '@/components/risk_calc'
import styles from './styles.module.less'

export const RiskCalcPanel = () => {
  return (
    <div className={styles.riskCalcWrapper}>
      <header className={styles.title}>期货交易风险计算面板</header>
      <RiskCalc />
    </div>
  )
}
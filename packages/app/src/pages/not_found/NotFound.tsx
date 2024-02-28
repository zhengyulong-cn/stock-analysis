import { Empty } from "antd";
import styles from './styles.module.less';

export const NotFound = () => {
  return (
    <div className={styles.emptyPage}>
      <Empty description="页面未找到" />
    </div>
  )
}
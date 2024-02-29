import { Table, TableProps } from "antd"
import { useEffect, useRef, useState } from "react"
import styles from './styles.module.less'
import { useAtom } from "jotai"
import { Atoms } from "@/store"

export const StandardMarginList = () => {
  const [futuresMargin] = useAtom(Atoms.futuresMarginAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef(null);
  const [clientHeight, setClientHeight] = useState(0);
  useEffect(() => {
    const height = wrapperRef.current?.clientHeight ? wrapperRef.current.clientHeight - 40 : 0;
    setClientHeight(height);
  })
  const columns: TableProps['columns'] = [
    {
      title: '品种',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: '代码',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: '交割月份',
      dataIndex: 'delivery_month',
      key: 'delivery_month',
    },
    {
      title: '交易所',
      dataIndex: 'exchange',
      key: 'exchange',
    },
    {
      title: '合约乘数',
      dataIndex: 'contract_multiplier',
      key: 'contract_multiplier',
    },
    {
      title: '交易所标准保证金',
      dataIndex: 'exchange_standard_margin',
      key: 'exchange_standard_margin',
      render(value) {
        const number = Math.trunc(Number(value) * 100)
        return <div>{ number }%</div>
      },
    },
    {
      title: '徽商期货保证金',
      dataIndex: 'huishang_standard_margin',
      key: 'huishang_standard_margin',
      render(value) {
        const number = Math.trunc(Number(value) * 100)
        return <div>{ number }%</div>
      },
    },
  ]
  return (
    <div className={styles.standardMarginListWrapper} ref={wrapperRef}>
      <div className={styles.title}>数据来源于徽商期货官网</div>
      <Table
        style={{
          height: clientHeight,
        }}
        ref={tableRef}
        className={styles.table}
        columns={columns}
        dataSource={futuresMargin}
        pagination={false}
        scroll={{
          // 表头高度约为55
          y: clientHeight - 55,
        }}
      />
    </div>
  )
}
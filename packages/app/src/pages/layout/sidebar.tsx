import { MenuProps } from "antd";
import { SlidersOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];

const menuData: MenuItem[] = [
  {
    label: '期货',
    key: 'futures',
    icon: <SlidersOutlined />,
    children: [
      {
        label: '交易风险计算面板',
        key: 'risk_calc',
      },
      {
        label: '徽商期货品种列表',
        key: 'standard_margin_list',
      },
    ],
  },
]

export default menuData;
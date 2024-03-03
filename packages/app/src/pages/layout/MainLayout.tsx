import { Layout, Menu, MenuProps, Spin } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from './styles.module.less'
import menuData from "./sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePublicLoad } from "@/hooks";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const { getFuturesMarginData } = usePublicLoad();
  const location = useLocation();
  const path = location.pathname.split('/').filter(o => o);
  const navicate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navicate('/risk_calc', { replace: true });
    }
  }, [])
  useLayoutEffect(() => {
    setSpinning(true);
    getFuturesMarginData().finally(() => {
      setSpinning(false);
    })
  }, [])
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navicate(key);
  }
  if (spinning) {
    return <Spin spinning={spinning} fullscreen size="large" />
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          onClick={handleMenuClick}
          items={menuData}
          mode="inline"
          defaultOpenKeys={['futures']}
          defaultSelectedKeys={path}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content className={styles.layoutContent}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
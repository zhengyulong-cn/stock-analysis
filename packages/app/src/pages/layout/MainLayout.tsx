import { Layout, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import styles from './styles.module.less'
import menuData from "./sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePublicLoad } from "@/hooks";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { getFuturesMarginData } = usePublicLoad();
  const location = useLocation();
  const navicate = useNavigate();
  useEffect(() => {
    getFuturesMarginData();
    if (location.pathname === '/') {
      navicate('/risk_calc', { replace: true });
    }
  }, [])
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navicate(key);
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          onClick={handleMenuClick}
          items={menuData}
          mode="inline"
          defaultOpenKeys={['futures']}                                                        
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
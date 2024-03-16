import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/pages/layout";
import { StandardMarginList } from "@/pages/standard_margin_list";
import { RiskCalcPanel } from "@/pages/risk_calc_panel";
import { NotFound } from "@/pages/not_found";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/risk_calc',
        element: <RiskCalcPanel />,
      },
      {
        path: '/standard_margin_list',
        element: <StandardMarginList />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
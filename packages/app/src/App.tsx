import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { router } from "@/routes";
import store from "@/store";

function App() {
  return (
    <React.StrictMode>
      <JotaiProvider store={store}>
        <Suspense fallback={<div>加载中...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </JotaiProvider>
    </React.StrictMode>
  )
}

export default App

import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback={<div>加载中...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  )
}

export default App

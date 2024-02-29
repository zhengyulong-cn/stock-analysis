import request from "@/axios";
import { IFuturesMarginItem, IBanProduct } from "@stock/core";

const officialApi = {
  async getFuturesMarginData() {
    const res = await request<IFuturesMarginItem[]>("official/data", {
      method: "GET",
    })
    return res.data;
  },
  async getBanProducts() {
    const res = await request<IBanProduct[]>("official/banProducts", {
      method: "GET",
    })
    return res.data;
  },
}

export default officialApi;
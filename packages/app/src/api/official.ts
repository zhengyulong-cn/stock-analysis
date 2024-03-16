import request from "@/axios";
import { IFuturesMarginItem, IBanProduct } from "@stock/core";

const officialApi = {
  async getFuturesMarginData() {
    try {
      const { data } = await request.get<IFuturesMarginItem[]>("official/data");
      return data;
    } catch (error: any) {
      console.error(error.message)
      return [];
    }
  },
  async getBanProducts() {
    const { data } = await request.get<IBanProduct[]>("official/banProducts");
    return data;
  },
}

export default officialApi;
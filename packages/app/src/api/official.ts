import request from "@/axios";

const officialApi = {
  async getFuturesMarginData() {
    const res = await request("official/data", {
      method: "GET"
    })
    return res.data;
  },
  async getOfficialOptions() {
    const res = await request<Array<{
      code: string;
      product: string;
      exchange: string;
      isBan: boolean;
    }>>("official/options", {
      method: "GET"
    })
    return res.data;
  }
}

export default officialApi;
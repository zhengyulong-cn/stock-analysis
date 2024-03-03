import Api from "@/api"
import { Atoms } from "@/store";
import { useAtom } from "jotai";

export const usePublicLoad = () => {
  const [_, setFuturesMarginAtom] = useAtom(Atoms.futuresMarginAtom);
  const getFuturesMarginData = async () => {
    const futuresMargin = await Api.getFuturesMarginData();
    await setFuturesMarginAtom(futuresMargin);
    return futuresMargin;
  }
  const getBanProducts = async () => {
    return await Api.getBanProducts();
  }
  return {
    getBanProducts,
    getFuturesMarginData,
  }
}
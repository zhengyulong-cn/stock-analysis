import { createStore } from 'jotai';

const jotaiStore = createStore();

interface IFeatureOptionItem {
  code: string;
  product: string;
  exchange: string;
  isBan: boolean;
}
export default jotaiStore;
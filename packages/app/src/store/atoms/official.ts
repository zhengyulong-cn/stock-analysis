import { atom } from 'jotai';
import { IFuturesMarginItem } from '@stock/core';

export const futuresMarginAtom = atom<IFuturesMarginItem[]>([]);
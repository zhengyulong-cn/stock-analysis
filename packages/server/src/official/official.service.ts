import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { IFuturesMarginItem } from './official';
import { banProducts } from './ban_products';

@Injectable()
export class OfficialService {
  constructor(private httpService: HttpService) {}
  async getFuturesMarginData(): Promise<IFuturesMarginItem[]> {
    const response = await firstValueFrom(this.httpService.get("https://www.hsqh.net/col170/index"));
    const { data: htmlData } = response;
    const $ = cheerio.load(htmlData as any);
    const tableData: IFuturesMarginItem[] = [];
    $('table#ul_list tr:not(.trTit)').each((_index, el) => {
      const row = $(el).find('td');
      tableData.push({
        exchange: row.eq(0).text().trim(),
        product: row.eq(1).text().trim(),
        symbol: row.eq(2).text().trim(),
        delivery_month: row.eq(3).text().trim(),
        key: row.eq(3).text().trim(),
        contract_multiplier: row.eq(4).text().trim(),
        exchange_standard_margin: row.eq(5).text().trim(),
        huishang_standard_margin: row.eq(6).text().trim(),
      });
    });
    return tableData;
  }

  async getProductsOptions() {
    const tableData = await this.getFuturesMarginData();
    return [...new Map(
      tableData.map(item => {
        const index = banProducts.findIndex(el => el.symbol === item.symbol);
        return [item.product + item.symbol, {
          code: item.symbol,
          product: item.product,
          exchange: item.exchange,
          isBan: index > 0,
        }];
      })
    ).values()];
  }
}

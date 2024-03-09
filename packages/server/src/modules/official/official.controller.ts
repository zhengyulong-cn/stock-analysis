import { Controller, Get } from '@nestjs/common';
import { OfficialService } from './official.service';

@Controller('official')
export class OfficialController {
  constructor(private readonly officialService: OfficialService) {}
  @Get('data')
  async getOfficialData() {
    return this.officialService.getFuturesMarginData();
  }
  @Get('banProducts')
  async getBanProducts() {
    return this.officialService.getBanProducts();
  }
}

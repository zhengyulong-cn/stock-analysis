import { Module } from '@nestjs/common';
import { OfficialService } from './official.service';
import { OfficialController } from './official.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OfficialController],
  providers: [OfficialService],
})
export class OfficialModule {}

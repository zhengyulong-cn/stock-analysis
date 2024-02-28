import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfficialModule } from './official/official.module';

@Module({
  imports: [
    OfficialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

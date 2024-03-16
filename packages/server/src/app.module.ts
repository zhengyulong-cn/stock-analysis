import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OfficialModule } from './modules/official/official.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    OfficialModule,
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

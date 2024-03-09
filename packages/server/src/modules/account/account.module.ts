import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    AccountService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
  controllers: [AccountController],
})
export class AccountModule {}

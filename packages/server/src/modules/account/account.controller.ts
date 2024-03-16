import { Body, Controller, Get, Post } from "@nestjs/common";
import { AccountService } from "./account.service";

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @Get('/list')
  async getAllAccounts() {
    return this.accountService.getAllAccounts();
  }
}
import { Injectable } from "@nestjs/common";
import { StockAccount } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAccounts(): Promise<StockAccount[]> {
    return this.prisma.stockAccount.findMany();
  }

  async getAccountsByUserName(username: string): Promise<Array<StockAccount>> {
    try {
      const accounts = this.prisma.stockAccount.findMany({
        where: {
          username,
        }
      })
      if (accounts) {
        return accounts;
      } else {
        throw new Error('没有该用户明对应的账户')
      }
    } catch (error) {
      console.error('在请求账户时候报错', error);
      throw error;
    }
  }

  async getAccountByUserId(userId: string): Promise<StockAccount> {
    try {
      const account = this.prisma.stockAccount.findUnique({
        where: {
          user_id: userId,
        }
      })
      if (account) { return account; }
      throw new Error('没有该用户')
    } catch (error) {
      console.error('在请求账户时候报错', error);
      throw error;
    }
  }

  async validateUser(userId: string, username: string, password: string): Promise<{
    user_id: string;
    username: string;
  }> {
    const user = await this.prisma.stockAccount.findUnique({
      where: {
        user_id: userId,
      },
      select: { user_id: true, username: true, hashed_password: true }
    })
    if (!user) {
      return null;
    }
    if (user.username === username && user.hashed_password === password) {
      const { hashed_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login() {
    
  }
}
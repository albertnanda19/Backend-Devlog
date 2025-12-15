import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDbConnection() {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('id,email,full_name,created_at,roles(name)')
        .limit(10);
      if (error) {
        return { success: false, error: error.message };
      }
      const mapped =
        (data as Array<any>)?.map((row) => ({
          id: row.id,
          email: row.email,
          full_name: row.full_name,
          role_name: row.roles?.name ?? null,
          created_at: row.created_at,
        })) ?? [];
      return { success: true, data: mapped };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return { success: false, error: message };
    }
  }
}

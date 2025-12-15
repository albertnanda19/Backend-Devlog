import { Global, Module } from '@nestjs/common';
import { AuditLoggerService } from './audit-logger.service';
import { SupabaseModule } from '../supabase.module';

@Global()
@Module({
	imports: [SupabaseModule],
	providers: [AuditLoggerService],
	exports: [AuditLoggerService],
})
export class AuditLoggerModule {}



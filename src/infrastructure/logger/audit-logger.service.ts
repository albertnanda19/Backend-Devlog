import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export type AuditLogInput = {
	userId: string;
	action: string;
	entityType?: string | null;
	entityId?: string | null;
};

@Injectable()
export class AuditLoggerService {
	constructor(
		@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
	) {}

	async log(input: AuditLogInput): Promise<void> {
		await this.supabase
			.from('audit_logs')
			.insert({
				user_id: input.userId,
				action: input.action,
				entity_type: input.entityType ?? null,
				entity_id: input.entityId ?? null,
			});
	}
}



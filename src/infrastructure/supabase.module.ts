import { Global, Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Global()
@Module({
	providers: [
		{
			provide: 'SUPABASE_CLIENT',
			useFactory: () =>
				createClient(
					process.env.SUPABASE_URL as string,
					process.env.SUPABASE_SERVICE_ROLE_KEY as string,
				),
		},
	],
	exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			stopAtFirstError: true,
			validationError: { target: false, value: false },
			exceptionFactory: (validationErrors) => {
				const errors = validationErrors.flatMap((err) => {
					const messages = err.constraints ? Object.values(err.constraints) : [];
					return messages.map((message) => ({
						field: err.property,
						message,
					}));
				});
				return new BadRequestException({
					statusCode: 400,
					message: 'Permintaan tidak valid. Periksa kembali data yang Anda kirim.',
					errors,
				});
			},
		}),
	);
	app.enableCors({ origin: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

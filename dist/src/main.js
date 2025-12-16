"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
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
            return new common_1.BadRequestException({
                statusCode: 400,
                message: 'Permintaan tidak valid. Periksa kembali data yang Anda kirim.',
                errors,
            });
        },
    }));
    app.enableCors({ origin: true });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
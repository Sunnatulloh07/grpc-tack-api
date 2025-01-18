import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { AllExceptionsFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.GATEWAY_PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway is running on http://localhost:${port}`);
}
bootstrap();

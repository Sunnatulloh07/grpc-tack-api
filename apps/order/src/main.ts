import { createService } from '@app/grpc';
import { SERVICE_PORTS } from '@app/shared';
import { OrderModule } from './order.module';
import { GrpcExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await createService('order', OrderModule, SERVICE_PORTS.ORDER as number);
  app.useGlobalFilters(new GrpcExceptionFilter());
  await app.listen();
  console.log('Order microservice is running...');
}
bootstrap();

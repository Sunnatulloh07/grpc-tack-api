import { createService } from '@app/grpc';
import { SERVICE_PORTS } from '@app/shared';
import { UserModule } from './user.module';
import { GrpcExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await createService('user', UserModule, SERVICE_PORTS.USER as number);
  app.useGlobalFilters(new GrpcExceptionFilter());
  await app.listen();
  console.log('User microservice is running...');
}
bootstrap();

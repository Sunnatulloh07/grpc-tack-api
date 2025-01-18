import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getServiceClientConfig } from '@app/grpc';
import { SERVICE_PORTS } from '@app/shared';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_PACKAGE',
        ...getServiceClientConfig('order', SERVICE_PORTS.ORDER as number),
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderClientModule {}

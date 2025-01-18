import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientGrpc, ClientsModule } from '@nestjs/microservices';
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
export class OrderClientModule implements OnApplicationBootstrap {
  constructor(@Inject('ORDER_PACKAGE') private readonly client: ClientGrpc) {}

  async onApplicationBootstrap() {
    try {
      const orderService = this.client.getService<any>('OrderService');
      const health = await orderService.healthCheck({});
      console.log('✅ Successfully connected to OrderService gRPC!', health);
    } catch (err) {
      console.error('❌ Failed to connect to OrderService gRPC:', err.message);
    }
  }
}

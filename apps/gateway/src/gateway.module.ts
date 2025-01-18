import { Module } from '@nestjs/common';
import { UserClientModule } from './user-client/user-client.module';
import { OrderClientModule } from './order-client/order-client.module';

@Module({
  imports: [UserClientModule, OrderClientModule],
})
export class GatewayModule {}

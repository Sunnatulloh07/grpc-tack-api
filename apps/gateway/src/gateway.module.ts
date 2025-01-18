import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@app/common';
import { UserClientModule } from './user-client/user-client.module';
import { OrderClientModule } from './order-client/order-client.module';

@Module({
  imports: [UserClientModule, OrderClientModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class GatewayModule {}

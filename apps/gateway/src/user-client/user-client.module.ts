import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getServiceClientConfig } from '@app/grpc';
import { SERVICE_PORTS } from '@app/shared';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...getServiceClientConfig('user', SERVICE_PORTS.USER as number),
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserClientModule {}

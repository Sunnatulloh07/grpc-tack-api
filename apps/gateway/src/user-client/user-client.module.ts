import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientGrpc, ClientsModule } from '@nestjs/microservices';
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
export class UserClientModule implements OnApplicationBootstrap {
  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  async onApplicationBootstrap() {
    try {
      const userService = this.client.getService<any>('UserService');
      const health = await userService.healthCheck({});
      console.log('✅ Successfully connected to UserService gRPC!', health);
    } catch (err) {
      console.error('❌ Failed to connect to UserService gRPC:', err.message);
    }
  }
}

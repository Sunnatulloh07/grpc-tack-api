import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

@Injectable()
export class GrpcClientMiddleware implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly client: ClientGrpcProxy) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('✅ Successfully connected to gRPC server!');
    } catch (err) {
      console.error('❌ Failed to connect to gRPC server:', err.message);
    }
  }

  onModuleDestroy() {
    console.log('⚠️ gRPC client disconnected.');
  }
}

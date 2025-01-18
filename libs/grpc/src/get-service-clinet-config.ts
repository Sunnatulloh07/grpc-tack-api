import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export function getServiceClientConfig(name: string, port: number): ClientOptions {
  const url = process.env.NODE_ENV === 'production' ? `${name}:${port}` : `localhost:${port}`;
  console.log(`ℹ️ Preparing to connect to gRPC service: ${name} on ${url}`);
  return {
    transport: Transport.GRPC,
    options: {
      package: name,
      protoPath: join(__dirname, '../../../proto', `${name}.proto`),
      url,
    },
  };
}

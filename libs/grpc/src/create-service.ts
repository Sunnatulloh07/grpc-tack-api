import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

export function createService(name: string, module: unknown, port: number): Promise<INestMicroservice> {
  return NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.GRPC,
    options: {
      package: name,
      protoPath: join(__dirname, '../../../proto', `${name}.proto`),
      url: process.env.NODE_ENV === 'production' ? `${name}:${port}` : `localhost:${port}`,
    },
  });
}

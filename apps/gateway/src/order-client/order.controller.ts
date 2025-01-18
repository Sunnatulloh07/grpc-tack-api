import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateOrderRequest, OrderResponse, SERVICE_PORTS } from '@app/shared';
import { getServiceClientConfig } from '@app/grpc';

interface OrderServiceClient {
  createOrder(data: CreateOrderRequest): Observable<OrderResponse>;
  getOrderById(data: { id: string }): Observable<OrderResponse>;
  updateOrder(data: { id: string; product: string; price: number }): Observable<OrderResponse>;
  deleteOrder(data: { id: string }): Observable<{}>;
}

@Controller('orders')
export class OrderController {
  @Client(getServiceClientConfig('order', SERVICE_PORTS.ORDER as number))
  private client: ClientGrpc;

  private orderService: OrderServiceClient;

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>('OrderService');
  }

  @Post()
  async create(@Body() body: CreateOrderRequest) {
    try {
      return await lastValueFrom(this.orderService.createOrder(body));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.orderService.getOrderById({ id }));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { product: string; price: number }) {
    try {
      return await lastValueFrom(this.orderService.updateOrder({ id, ...body }));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.orderService.deleteOrder({ id }));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

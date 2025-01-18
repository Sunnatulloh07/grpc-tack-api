import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderRequest, GetOrderByIdRequest, UpdateOrderRequest, DeleteOrderRequest } from '@app/shared';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(data: CreateOrderRequest) {
    return this.orderService.createOrder(data);
  }

  @GrpcMethod('OrderService', 'GetOrderById')
  getOrderById(data: GetOrderByIdRequest) {
    return this.orderService.getOrderById(data.id);
  }

  @GrpcMethod('OrderService', 'UpdateOrder')
  updateOrder(data: UpdateOrderRequest) {
    return this.orderService.updateOrder(data);
  }

  @GrpcMethod('OrderService', 'DeleteOrder')
  deleteOrder(data: DeleteOrderRequest) {
    return this.orderService.deleteOrder(data.id);
  }

  @GrpcMethod('OrderService', 'HealthCheck')
  healthCheck(): { status: string } {
    return { status: 'healthy' };
  }
}

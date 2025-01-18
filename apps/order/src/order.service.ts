import { Order } from '@app/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(data: { userId: string; product: string; price: number }) {
    try {
      if (!data.userId || !data.product || !data.price) {
        throw new RpcException({ message: 'Invalid data', code: 400 });
      }
      const created = new this.orderModel(data);
      return created.save();
    } catch (error) {
      throw new RpcException({ message: 'Order not found', code: 500 });
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new RpcException({ message: 'Order not found', code: 404 });
      }
      return order;
    } catch (error) {
      throw new RpcException({ message: 'Order not found', code: 500 });
    }
  }

  async updateOrder(data: { id: string; product: string; price: number }) {
    try {
      const updated = await this.orderModel
        .findByIdAndUpdate(data.id, { product: data.product, price: data.price }, { new: true })
        .exec();
      if (!updated) {
        throw new RpcException({ message: 'Order not found', code: 404 });
      }
      return updated;
    } catch (error) {
      throw new RpcException({ message: 'Order not found', code: 500 });
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderModel.findByIdAndDelete(id).exec();
      return {};
    } catch (error) {
      throw new RpcException({ message: 'Order not found', code: 500 });
    }
  }
}

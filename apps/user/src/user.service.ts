import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequest, User } from '@app/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: CreateUserRequest) {
    try {
      if (!data.email || !data.name) {
        throw new RpcException({ message: 'Email and name are required', code: 400 });
      }
      const findUser = await this.userModel.findOne({ email: data.email });
      if (findUser) {
        throw new RpcException({ message: 'User already exists', code: 400 });
      }
      const created = new this.userModel(data);
      return created.save();
    } catch (error) {
      throw new RpcException({ message: 'User already exists', code: 500 });
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new RpcException({ message: 'User not found', code: 404 });
      }
      return user;
    } catch (error) {
      throw new RpcException({ message: 'User not found', code: 500 });
    }
  }

  async updateUser(data: { id: string; name: string; email: string }) {
    try {
      const updated = await this.userModel
        .findByIdAndUpdate(data.id, { name: data.name, email: data.email }, { new: true })
        .exec();
      if (!updated) {
        throw new RpcException({ message: 'User not found', code: 404 });
      }
      return updated;
    } catch (error) {
      throw new RpcException({ message: 'User not found', code: 500 });
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
      return {};
    } catch (error) {
      throw new RpcException({ message: 'User not found', code: 500 });
    }
  }
}

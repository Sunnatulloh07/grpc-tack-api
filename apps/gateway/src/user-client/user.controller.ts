import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateUserRequest, UserResponse } from '@app/shared/interfaces/user.interface';
import { SERVICE_PORTS } from '@app/shared';
import { getServiceClientConfig } from '@app/grpc';

interface UserServiceClient {
  createUser(data: CreateUserRequest): Observable<UserResponse>;
  getUserById(data: { id: string }): Observable<UserResponse>;
  updateUser(data: { id: string; name: string; email: string }): Observable<UserResponse>;
  deleteUser(data: { id: string }): Observable<{}>;
}

@Controller('users')
export class UserController {
  @Client(getServiceClientConfig('user', SERVICE_PORTS.USER as number))
  private client: ClientGrpc;

  private userService: UserServiceClient;

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Post()
  async create(@Body() body: CreateUserRequest) {
    try {
      return await lastValueFrom(this.userService.createUser(body));
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
      return await lastValueFrom(this.userService.getUserById({ id }));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name: string; email: string }) {
    try {
      return await lastValueFrom(this.userService.updateUser({ id, ...body }));
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
      return await lastValueFrom(this.userService.deleteUser({ id }));
    } catch (error) {
      if (error.code === 14) {
        throw new HttpException('Service is currently unavailable', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

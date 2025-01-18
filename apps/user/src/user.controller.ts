import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserRequest, DeleteUserRequest, GetUserByIdRequest, UpdateUserRequest } from '@app/shared';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  createUser(data: CreateUserRequest) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetUserById')
  getUserById(data: GetUserByIdRequest) {
    return this.userService.getUserById(data.id);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  updateUser(data: UpdateUserRequest) {
    return this.userService.updateUser(data);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  deleteUser(data: DeleteUserRequest) {
    return this.userService.deleteUser(data.id);
  }
}

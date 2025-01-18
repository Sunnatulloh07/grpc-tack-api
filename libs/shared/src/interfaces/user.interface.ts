export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface GetUserByIdRequest {
  id: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

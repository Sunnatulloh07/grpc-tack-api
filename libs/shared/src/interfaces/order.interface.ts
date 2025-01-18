export interface CreateOrderRequest {
  userId: string;
  product: string;
  price: number;
}

export interface GetOrderByIdRequest {
  id: string;
}

export interface UpdateOrderRequest {
  id: string;
  userId: string;
  product: string;
  price: number;
}

export interface DeleteOrderRequest {
  id: string;
}

export interface OrderResponse {
  id: string;
  userId: string;
  product: string;
  price: number;
}

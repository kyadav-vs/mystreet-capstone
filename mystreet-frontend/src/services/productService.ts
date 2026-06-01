import axios from 'axios';
import type { Product } from '../types';

// Use environment variable for API URL in production, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create an axios instance with auth interceptor
export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async (
  brand?: string, 
  size?: string,
  minPrice?: string,
  maxPrice?: string,
  sort?: string
): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (brand) params.append('brand', brand);
  if (size) params.append('size', size);
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (sort) params.append('sort', sort);

  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`, { params });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Order Types
export interface OrderItemRequest {
  productId: string;
  selectedSize: string;
  quantity: number;
}

export interface OrderRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipcode: string;
  paymentMode: string;
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipcode: string;
  paymentMode: string;
  totalAmount: number;
  createdAt: string;
  items: {
    id: string;
    product: Product;
    selectedSize: string;
    quantity: number;
    priceAtTime: number;
  }[];
}

export const createOrder = async (orderData: OrderRequest) => {
  const response = await api.post<OrderResponse>('/orders', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get<OrderResponse[]>('/orders/mine');
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get<OrderResponse>(`/orders/${id}`);
  return response.data;
};

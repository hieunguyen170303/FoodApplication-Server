export interface OrderItemDTO {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  storeName: string;
  storeLogo?: string;
  estimatedTime?: string;
  totalPrice: number;
  paymentMethod?: string;
  deliveryAddress?: string;
  items: OrderItemDTO[];
}

export interface OrderRow {
  id: string;
  user_id?: string;
  store_name: string;
  store_logo: string;
  status: "PREPARING" | "DELIVERING" | "COMPLETED" | "CANCELLED";
  status_text: string;
  estimated_time: string;
  current_step_index: number;
  total_price: number;
  payment_method: string;
  delivery_address: string;
  driver_name: string;
  driver_phone: string;
  driver_rating: number;
  driver_vehicle: string;
  created_at?: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  name: string;
  quantity: number;
  price: number;
}

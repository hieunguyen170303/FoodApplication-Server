import { supabaseAdmin } from "../config/supabase";
import { CreateOrderDTO } from "../types/order";

// In-memory fallback live order store for fast response
// Starts as null — only populated after a real customer order is placed
let liveActiveOrder: any = null;


const MOCK_ORDER_HISTORY = [
  {
    id: "ORD-8712",
    storeName: "KFC - Tòa Nhà Sora Gardens SC",
    storeLogo: "burgerTwo",
    status: "COMPLETED",
    statusText: "Đơn hàng đã hoàn thành",
    orderDate: "10/08/2026 - 18:30",
    items: [
      {
        id: "i2",
        name: "Combo Gà Rán Ròn Rã + 2 Pepsi lớn",
        quantity: 1,
        price: 145000,
      },
    ],
    totalPrice: 145000,
  },
  {
    id: "ORD-7619",
    storeName: "Lotteria - Midori Park Bình Dương",
    storeLogo: "pizzaOne",
    status: "COMPLETED",
    statusText: "Đơn hàng đã hoàn thành",
    orderDate: "05/08/2026 - 12:15",
    items: [
      {
        id: "i3",
        name: "Burger Bò Tôm + Fries + Coke",
        quantity: 1,
        price: 95000,
      },
    ],
    totalPrice: 95000,
  },
];

export class OrderService {
  static async createOrder(userId: string | undefined, dto: CreateOrderDTO) {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      user_id: userId || null,
      storeName: dto.storeName || "KFC - Tòa Nhà Sora Gardens SC",
      storeLogo: dto.storeLogo || "burgerTwo",
      status: "DELIVERING",
      statusText: "Tài xế đang giao hàng đến bạn",
      estimatedTime: dto.estimatedTime || "19 phút",
      currentStepIndex: 2,
      orderDate: "Hôm nay, vừa xong",
      items: dto.items.map((it, idx) => ({
        id: `live_i_${idx}`,
        name: it.name,
        quantity: it.quantity,
        price: it.price,
      })),
      totalPrice: dto.totalPrice,
      paymentMethod: dto.paymentMethod || "MoMo",
      deliveryAddress: dto.deliveryAddress || "Đại Học Quốc Tế Miền Đông",
      driverInfo: {
        name: "Nguyễn Văn Hùng",
        phone: "0901234567",
        rating: 4.9,
        vehicleNumber: "61B1 - 888.99",
        avatar: "avatar",
      },
    };

    // Save into memory store
    liveActiveOrder = newOrder;

    // Push newly created customer order to top of Shipper available feed!
    try {
      const { ShipperService } = require("./shipperService");
      ShipperService.addNewCustomerOrder(newOrder);
    } catch (err) {
      console.warn("Error pushing order to Shipper feed:", err);
    }

    // Try saving to Supabase orders table asynchronously
    try {
      await supabaseAdmin.from("orders").insert({
        id: orderId,
        user_id: userId,
        store_name: dto.storeName,
        total_price: dto.totalPrice,
        status: "DELIVERING",
        status_text: "Tài xế đang giao hàng đến bạn",
        estimated_time: dto.estimatedTime || "19 phút",
      });
    } catch (e) {
      console.warn("Supabase orders insert async log");
    }

    return newOrder;
  }

  static async getActiveOrder() {
    return liveActiveOrder;
  }

  static async getOrderHistory() {
    return MOCK_ORDER_HISTORY;
  }

  static updateLiveOrderStatus(orderId: string, status: string, stepIndex: number, statusText: string) {
    if (liveActiveOrder) {
      console.log(`[OrderService] Updating live order ${liveActiveOrder.id} → status=${status}, step=${stepIndex}`);
      liveActiveOrder.status = status;
      liveActiveOrder.currentStepIndex = stepIndex;
      liveActiveOrder.statusText = statusText;
    } else {
      console.warn(`[OrderService] updateLiveOrderStatus called but liveActiveOrder is null. orderId param: ${orderId}`);
    }
  }

  static completeLiveOrder(orderId: string) {
    if (liveActiveOrder) {
      const finished = {
        ...liveActiveOrder,
        status: "COMPLETED",
        statusText: "Đơn hàng đã hoàn thành",
        currentStepIndex: 3,
      };
      if (!MOCK_ORDER_HISTORY.some((o: any) => o.id === finished.id)) {
        MOCK_ORDER_HISTORY.unshift(finished);
      }
      liveActiveOrder = null;
    }
  }
}

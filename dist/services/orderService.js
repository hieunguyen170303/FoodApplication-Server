"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const supabase_1 = require("../config/supabase");
// In-memory fallback live order store for fast response
let liveActiveOrder = {
    id: "ORD-9821",
    storeName: "Jollibee - EC Nguyễn Du",
    storeLogo: "logo",
    status: "DELIVERING",
    statusText: "Tài xế đang giao hàng đến bạn",
    estimatedTime: "15 - 20 phút (14:35)",
    currentStepIndex: 2,
    orderDate: "Hôm nay, 14:15",
    items: [
        {
            id: "i1",
            name: "1 Miếng Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly vừa + 1 Khoai tây chiên + 1 Pepsi",
            quantity: 1,
            price: 78000,
        },
    ],
    totalPrice: 108000,
    driverInfo: {
        name: "Nguyễn Văn Hùng",
        phone: "0901234567",
        rating: 4.9,
        vehicleNumber: "61B1 - 888.99",
        avatar: "avatar",
    },
};
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
class OrderService {
    static async createOrder(userId, dto) {
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
        // Try saving to Supabase orders table asynchronously
        try {
            await supabase_1.supabaseAdmin.from("orders").insert({
                id: orderId,
                user_id: userId,
                store_name: dto.storeName,
                total_price: dto.totalPrice,
                status: "DELIVERING",
                status_text: "Tài xế đang giao hàng đến bạn",
                estimated_time: dto.estimatedTime || "19 phút",
            });
        }
        catch (e) {
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
}
exports.OrderService = OrderService;

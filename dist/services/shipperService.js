"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipperService = void 0;
const socketService_1 = require("./socketService");
let mockAvailableOrders = [
    {
        id: "ORD-9821",
        orderCode: "FOOD-9821",
        storeName: "Jollibee - EC Nguyễn Du",
        storeAddress: "Tầng 1, EC Nguyễn Du, Hùng Vương, Thủ Dầu Một",
        storePhone: "0274 382 119",
        customerName: "Nguyễn Văn Hùng",
        customerPhone: "0912 345 678",
        deliveryAddress: "Phòng 14.02, Chung cư Bcons City, Dĩ An, Bình Dương",
        distanceText: "2.4 km",
        itemsSummary: "1x Combo Gà Giòn Vui Vẻ + 1x Mỳ Ý Jolly + 1x Pepsi",
        totalFoodPrice: 108000,
        shippingEarnings: 25000,
        status: "AVAILABLE",
        statusText: "Đơn hàng mới chờ nhận",
        isPriority: true,
        createdAt: "🔥 Vừa mới tạo",
    },
    {
        id: "ORD-9822",
        orderCode: "FOOD-9822",
        storeName: "KFC - Nguyễn Trãi",
        storeAddress: "235 Nguyễn Trãi, Phường Phú Hòa, Thủ Dầu Một",
        storePhone: "0274 399 888",
        customerName: "Trần Thị Mai",
        customerPhone: "0988 777 666",
        deliveryAddress: "128 Đường Lê Hồng Phong, Phú Lợi, Thủ Dầu Một",
        distanceText: "1.8 km",
        itemsSummary: "2x Miếng Gà Rán + 1x Khoai Tây Chiên Lớn + 2x Mirinda",
        totalFoodPrice: 110000,
        shippingEarnings: 18000,
        status: "AVAILABLE",
        statusText: "Đơn hàng mới chờ nhận",
        isPriority: false,
        createdAt: "15 phút trước",
    },
];
let mockActiveOrder = null; // Default null so Shipper can pick up an order
let mockHistoryOrders = [
    {
        id: "ORD-9540",
        orderCode: "FOOD-9540",
        storeName: "Bún Chả Hà Nội - Phú Cường",
        storeAddress: "12 Yersin, Phường Phú Cường, Thủ Dầu Một",
        customerName: "Vũ Thị Hương",
        deliveryAddress: "89 Đường Thích Quảng Đức, Phú Cường",
        distanceText: "2.1 km",
        shippingEarnings: 22000,
        status: "COMPLETED",
        createdAt: "Hôm nay, 12:30",
    },
];
let mockChatMessages = {
    "ORD-9821": [
        {
            id: "msg_init_1",
            orderId: "ORD-9821",
            senderRole: "SHIPPER",
            senderName: "Tài xế Nguyễn Văn Hùng",
            text: "Chào bạn, mình vừa nhận đơn hàng và đang lấy món tại quán ạ! 🛵",
            timestamp: "Vừa xong",
        },
    ],
};
class ShipperService {
    static async getStats() {
        return {
            todayEarnings: 350000,
            completedCount: mockHistoryOrders.length,
            rating: 4.9,
            acceptanceRate: "98%",
        };
    }
    static async getAvailableOrders() {
        return mockAvailableOrders;
    }
    static async getActiveOrder() {
        return mockActiveOrder;
    }
    /**
     * Push newly created customer order to top of Shipper available feed
     */
    static addNewCustomerOrder(newOrder) {
        const shipperFormattedOrder = {
            id: newOrder.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            orderCode: newOrder.id ? `FOOD-${newOrder.id.replace("ORD-", "")}` : `FOOD-${Math.floor(1000 + Math.random() * 9000)}`,
            storeName: newOrder.storeName || "Jollibee - EC Nguyễn Du",
            storeAddress: "TTTM Sora Gardens SC, Hùng Vương, Thủ Dầu Một",
            storePhone: "0274 382 119",
            customerName: "Nguyễn Văn Hùng",
            customerPhone: "0912 345 678",
            deliveryAddress: newOrder.deliveryAddress || "Chung cư Bcons City, Bình Dương",
            distanceText: "2.1 km",
            itemsSummary: newOrder.items ? newOrder.items.map((i) => `${i.quantity}x ${i.name}`).join(" + ") : "Món ăn từ khách hàng",
            totalFoodPrice: newOrder.totalPrice || 108000,
            shippingEarnings: 25000,
            status: "AVAILABLE",
            statusText: "Đơn hàng mới vừa tạo từ khách!",
            isPriority: true,
            createdAt: "🔥 Vừa mới tạo",
        };
        mockAvailableOrders.unshift(shipperFormattedOrder);
        console.log("🔥 New Customer Order pushed to Shipper Feed:", shipperFormattedOrder.orderCode);
        // Broadcast WebSocket notification to ALL active Shippers in real time!
        try {
            socketService_1.socketService.broadcastNewOrderToShippers(shipperFormattedOrder);
        }
        catch (e) {
            console.warn("Could not broadcast new order to shippers:", e);
        }
        return shipperFormattedOrder;
    }
    /**
     * Accept an order - STRICT RULE: Only 1 active order at a time!
     */
    static async acceptOrder(orderId) {
        // 1. Strict Check: If Shipper already has an active order, block new acceptance!
        if (mockActiveOrder !== null) {
            throw new Error("Bạn đang có 1 đơn hàng đang giao! Vui lòng hoàn thành đơn hiện tại trước khi nhận đơn mới.");
        }
        const idx = mockAvailableOrders.findIndex((o) => o.id === orderId);
        if (idx !== -1) {
            const accepted = mockAvailableOrders[idx];
            accepted.status = "ACCEPTED";
            accepted.statusText = "Tài xế Nguyễn Văn Hùng đã nhận đơn!";
            mockAvailableOrders.splice(idx, 1);
            mockActiveOrder = accepted;
            // Broadcast WebSocket notification to Customer in real-time
            socketService_1.socketService.broadcastOrderStatus(orderId, "ACCEPTED", 1, accepted.statusText);
            // Sync OrderService
            try {
                const { OrderService } = require("./orderService");
                OrderService.updateLiveOrderStatus(orderId, "ACCEPTED", 1, accepted.statusText);
            }
            catch (e) { }
            return accepted;
        }
        throw new Error("Đơn hàng không khả dụng hoặc đã được tài xế khác nhận!");
    }
    /**
     * Update order status
     */
    static async updateOrderStatus(orderId, status) {
        if (!mockActiveOrder) {
            throw new Error("Không tìm thấy đơn hàng đang giao!");
        }
        // Snapshot BEFORE resetting so we always have a valid return value
        const snapshot = { ...mockActiveOrder };
        mockActiveOrder.status = status;
        let stepIndex = 1;
        let statusText = "";
        if (status === "PICKED_UP") {
            stepIndex = 1;
            statusText = "Tài xế đã lấy món tại quán & đang di chuyển";
        }
        else if (status === "DELIVERING") {
            stepIndex = 2;
            statusText = "Tài xế đang giao hàng đến địa chỉ của bạn";
        }
        else if (status === "COMPLETED") {
            stepIndex = 3;
            statusText = "Đơn hàng đã được giao thành công!";
            mockHistoryOrders.unshift({ ...mockActiveOrder });
        }
        mockActiveOrder.statusText = statusText;
        snapshot.statusText = statusText;
        snapshot.status = status;
        // Broadcast WebSocket update to Customer in real-time!
        socketService_1.socketService.broadcastOrderStatus(orderId, status, stepIndex, statusText);
        // Synchronize backend OrderService status so Customer REST API returns COMPLETED!
        try {
            const { OrderService } = require("./orderService");
            OrderService.updateLiveOrderStatus(orderId, status, stepIndex, statusText);
        }
        catch (e) {
            console.warn("Could not update OrderService status:", e);
        }
        if (status === "COMPLETED") {
            mockActiveOrder = null; // Reset active order to NULL so Shipper can pick up next order!
            return snapshot; // Return snapshot (not null!) so frontend can use shippingEarnings etc.
        }
        return mockActiveOrder;
    }
    static async getHistory() {
        return mockHistoryOrders;
    }
    static async getMessages(orderId) {
        return mockChatMessages[orderId] || [];
    }
    static async sendMessage(orderId, senderRole, senderName, text) {
        const newMsg = {
            id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            orderId,
            senderRole,
            senderName,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        if (!mockChatMessages[orderId]) {
            mockChatMessages[orderId] = [];
        }
        mockChatMessages[orderId].push(newMsg);
        // Broadcast WebSocket chat message
        socketService_1.socketService.broadcastChatMessage(orderId, newMsg);
        return newMsg;
    }
}
exports.ShipperService = ShipperService;

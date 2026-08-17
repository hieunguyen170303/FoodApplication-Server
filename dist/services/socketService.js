"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketService = void 0;
const socket_io_1 = require("socket.io");
class SocketService {
    io = null;
    getRoomName(orderId) {
        return orderId.startsWith("order:") ? orderId : `order:${orderId}`;
    }
    init(httpServer) {
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT"],
            },
        });
        this.io.on("connection", (socket) => {
            console.log(`🔌 New WebSocket client connected: ${socket.id}`);
            // Client joins a specific order room
            socket.on("join_room", (rawRoom) => {
                const room = this.getRoomName(rawRoom);
                socket.join(room);
                console.log(`📡 Socket ${socket.id} joined room: ${room}`);
            });
            // Handle real-time chat message sending
            socket.on("chat:send_message", (data) => {
                const room = this.getRoomName(data.orderId);
                console.log(`💬 WebSocket Chat message broadcast in ${room}:`, data.message);
                this.io?.to(room).emit("chat:new_message", data.message);
            });
            // Handle real-time order status update
            socket.on("order:update_status", (data) => {
                const room = this.getRoomName(data.orderId);
                console.log(`🛵 WebSocket Order Status Update broadcast in ${room}:`, data);
                this.io?.to(room).emit("order:status_changed", data);
            });
            socket.on("disconnect", () => {
                console.log(`❌ Socket client disconnected: ${socket.id}`);
            });
        });
        console.log("⚡ Socket.io WebSocket server initialized");
    }
    // Broadcast new customer order to ALL connected Shippers in real-time
    broadcastNewOrderToShippers(order) {
        if (this.io) {
            console.log("⚡ Broadcasting new available order to all Shippers via WebSocket:", order.orderCode);
            this.io.emit("shipper:new_order_available", order);
        }
    }
    // Helper method to broadcast order status update from REST Controllers
    broadcastOrderStatus(orderId, status, stepIndex, statusText) {
        if (this.io) {
            const room = this.getRoomName(orderId);
            this.io.to(room).emit("order:status_changed", {
                orderId,
                status,
                stepIndex,
                statusText,
                updatedAt: new Date().toISOString(),
            });
        }
    }
    // Helper method to broadcast new chat message from REST Controllers
    broadcastChatMessage(orderId, message) {
        if (this.io) {
            const room = this.getRoomName(orderId);
            this.io.to(room).emit("chat:new_message", message);
        }
    }
}
exports.socketService = new SocketService();

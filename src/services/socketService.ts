import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

class SocketService {
  private io: SocketIOServer | null = null;

  private getRoomName(orderId: string): string {
    return orderId.startsWith("order:") ? orderId : `order:${orderId}`;
  }

  public init(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log(`🔌 New WebSocket client connected: ${socket.id}`);

      // Client joins a specific order room
      socket.on("join_room", (rawRoom: string) => {
        const room = this.getRoomName(rawRoom);
        socket.join(room);
        console.log(`📡 Socket ${socket.id} joined room: ${room}`);
      });

      // Handle real-time chat message sending
      socket.on("chat:send_message", (data: { orderId: string; message: any }) => {
        const room = this.getRoomName(data.orderId);
        console.log(`💬 WebSocket Chat message broadcast in ${room}:`, data.message);
        this.io?.to(room).emit("chat:new_message", data.message);
      });

      // Handle real-time order status update — emit only to specific room
      socket.on("order:update_status", (data: { orderId: string; status: string; stepIndex: number; statusText: string }) => {
        const room = this.getRoomName(data.orderId);
        console.log(`\ud83d\uded5 WebSocket Order Status Update broadcast in ${room}:`, data);
        this.io?.to(room).emit("order:status_changed", data);
      });

      socket.on("disconnect", () => {
        console.log(`❌ Socket client disconnected: ${socket.id}`);
      });
    });

    console.log("⚡ Socket.io WebSocket server initialized");
  }

  // Broadcast new customer order to ALL connected Shippers in real-time
  public broadcastNewOrderToShippers(order: any) {
    if (this.io) {
      console.log("⚡ Broadcasting new available order to all Shippers via WebSocket:", order.orderCode);
      this.io.emit("shipper:new_order_available", order);
    }
  }

  // Helper method to broadcast order status update from REST Controllers
  public broadcastOrderStatus(orderId: string, status: string, stepIndex: number, statusText: string) {
    if (this.io) {
      const room = this.getRoomName(orderId);
      const payload = {
        orderId,
        status,
        stepIndex,
        statusText,
        updatedAt: new Date().toISOString(),
      };
      // Always emit to the specific room
      this.io.to(room).emit("order:status_changed", payload);
      console.log(`\ud83d\uded5 WebSocket Order Status Update broadcast in ${room}:`, { orderId, status, stepIndex, statusText });
    }
  }

  // Helper method to broadcast new chat message from REST Controllers
  public broadcastChatMessage(orderId: string, message: any) {
    if (this.io) {
      const room = this.getRoomName(orderId);
      this.io.to(room).emit("chat:new_message", message);
    }
  }
}

export const socketService = new SocketService();

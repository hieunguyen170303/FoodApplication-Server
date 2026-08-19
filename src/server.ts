import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { socketService } from "./services/socketService";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server to attach Express app & Socket.io WebSocket server
const server = http.createServer(app);

// Initialize Socket.io WebSocket service
socketService.init(server);

server.listen(PORT, () => {
  console.log(`🚀 FoodApplication-Server is running on http://localhost:${PORT}`);
  console.log(`📑 Swagger UI Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`📡 Supabase URL: ${process.env.SUPABASE_URL}`);
  console.log(`✉️ Gmail App Password SMTP active for ${process.env.SMTP_USER || "hieupro120593@gmail.com"}`);
});

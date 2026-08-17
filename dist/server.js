"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const socketService_1 = require("./services/socketService");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Create HTTP server to attach Express app & Socket.io WebSocket server
const server = http_1.default.createServer(app_1.default);
// Initialize Socket.io WebSocket service
socketService_1.socketService.init(server);
server.listen(PORT, () => {
    console.log(`🚀 FoodApplication-Server is running on http://localhost:${PORT}`);
    console.log(`📑 Swagger UI Documentation available at http://localhost:${PORT}/api-docs`);
    console.log(`📡 Supabase URL: ${process.env.SUPABASE_URL}`);
    console.log(`✉️ Gmail App Password SMTP active for ${process.env.SMTP_USER || "hieupro120593@gmail.com"}`);
});

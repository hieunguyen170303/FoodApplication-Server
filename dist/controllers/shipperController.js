"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipperController = void 0;
const shipperService_1 = require("../services/shipperService");
class ShipperController {
    static async getStats(req, res) {
        try {
            const stats = await shipperService_1.ShipperService.getStats();
            res.status(200).json({ success: true, stats });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getAvailableOrders(req, res) {
        try {
            const orders = await shipperService_1.ShipperService.getAvailableOrders();
            res.status(200).json({ success: true, orders });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getActiveOrder(req, res) {
        try {
            const order = await shipperService_1.ShipperService.getActiveOrder();
            res.status(200).json({ success: true, order });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async acceptOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await shipperService_1.ShipperService.acceptOrder(id);
            res.status(200).json({ success: true, order, message: "Nhận đơn hàng thành công!" });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await shipperService_1.ShipperService.updateOrderStatus(id, status);
            res.status(200).json({ success: true, order, message: "Cập nhật trạng thái thành công!" });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
    static async getHistory(req, res) {
        try {
            const history = await shipperService_1.ShipperService.getHistory();
            res.status(200).json({ success: true, history });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getMessages(req, res) {
        try {
            const { orderId } = req.params;
            const messages = await shipperService_1.ShipperService.getMessages(orderId);
            res.status(200).json({ success: true, messages });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async sendMessage(req, res) {
        try {
            const { orderId } = req.params;
            const { senderRole, senderName, text } = req.body;
            const message = await shipperService_1.ShipperService.sendMessage(orderId, senderRole || "SHIPPER", senderName || "Shipper", text);
            res.status(201).json({ success: true, message });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.ShipperController = ShipperController;

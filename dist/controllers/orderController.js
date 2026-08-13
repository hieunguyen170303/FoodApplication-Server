"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderService_1 = require("../services/orderService");
class OrderController {
    static async createOrder(req, res) {
        try {
            const dto = req.body;
            const userId = req.userId;
            const order = await orderService_1.OrderService.createOrder(userId, dto);
            res.status(201).json({ success: true, data: order });
        }
        catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
    static async getActiveOrder(req, res) {
        try {
            const activeOrder = await orderService_1.OrderService.getActiveOrder();
            res.status(200).json({ success: true, data: activeOrder });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
    static async getOrderHistory(req, res) {
        try {
            const history = await orderService_1.OrderService.getOrderHistory();
            res.status(200).json({ success: true, data: history });
        }
        catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.OrderController = OrderController;

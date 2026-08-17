import { Request, Response } from "express";
import { ShipperService } from "../services/shipperService";

export class ShipperController {
  static async getStats(req: Request, res: Response) {
    try {
      const stats = await ShipperService.getStats();
      res.status(200).json({ success: true, stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getAvailableOrders(req: Request, res: Response) {
    try {
      const orders = await ShipperService.getAvailableOrders();
      res.status(200).json({ success: true, orders });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getActiveOrder(req: Request, res: Response) {
    try {
      const order = await ShipperService.getActiveOrder();
      res.status(200).json({ success: true, order });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async acceptOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await ShipperService.acceptOrder(id);
      res.status(200).json({ success: true, order, message: "Nhận đơn hàng thành công!" });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await ShipperService.updateOrderStatus(id, status);
      res.status(200).json({ success: true, order, message: "Cập nhật trạng thái thành công!" });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getHistory(req: Request, res: Response) {
    try {
      const history = await ShipperService.getHistory();
      res.status(200).json({ success: true, history });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const messages = await ShipperService.getMessages(orderId);
      res.status(200).json({ success: true, messages });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async sendMessage(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { senderRole, senderName, text } = req.body;
      const message = await ShipperService.sendMessage(orderId, senderRole || "SHIPPER", senderName || "Shipper", text);
      res.status(201).json({ success: true, message });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}

import { Request, Response } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body;
      const userId = (req as any).userId;
      const order = await OrderService.createOrder(userId, dto);
      res.status(201).json({ success: true, data: order });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getActiveOrder(req: Request, res: Response): Promise<void> {
    try {
      const activeOrder = await OrderService.getActiveOrder();
      res.status(200).json({ success: true, data: activeOrder });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getOrderHistory(req: Request, res: Response): Promise<void> {
    try {
      const history = await OrderService.getOrderHistory();
      res.status(200).json({ success: true, data: history });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
